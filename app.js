var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var config = require("./config");

var fileUpload = require("express-fileupload");

var mongoose = require("mongoose");

var options = { server: { socketOptions: { connectTimeoutMS: 5000 } } };
mongoose.connect(config.mongoURI, options, function(err) {
  console.log(err);
});

require("./models/User");
require("./models/forum/message");
require("./models/forum/chat");
require("./models/jobOpp");

var index = require("./routes/index");
var users = require("./routes/users");
var profile = require("./routes/profile");
var pool_profile = require("./routes/pool_profile");
var page_profile = require("./routes/page_profile");
var trombinoscope_5 = require("./routes/trombinoscope_5");
var job_opportunity = require("./routes/job_opportunity"); // ajout
var admin = require("./routes/admin");
var forum = require("./routes/forum");

var app = express();

// -------------------------------------------
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var Messages = mongoose.model("messages");
var Chats = mongoose.model("chats");

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on("connection", function(socket) {
  console.log("je suis connecte!");

  Chats.find({}, function(error, rooms) {
    if (error) {
      return res.status(422).send("error when fetching chats");
    }

    // when the client emits 'adduser', this listens and executes
    socket.on("adduser", function(data) {
      // store the username in the socket session for this client
      socket.username = data.username;
      // store the room name in the socket session for this client
      if (rooms[0]) {
        socket.room = rooms[0]._id;
        // add the client's username to the global list
        usernames[data.username] = data.username;
        // send client to room 1
        socket.join(rooms[0]._id);
        // echo to client they've connected
        socket.emit("updatechat", "SERVER", "you have connected to room1");
        // echo to room 1 that a person has connected to their room
        socket.broadcast
          .to(rooms[0]._id)
          .emit(
            "updatechat",
            "SERVER",
            data.username + " has connected to this room"
          );
        socket.emit("updaterooms", rooms, rooms[0]._id);

        Messages.find({ chatId: rooms[0]._id }, function(error, messages) {
          if (error) {
            return res.status(422).send("error when saving message");
          }
          socket.emit("initiatechat", messages);
        });
      }
    });
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on("sendchat", function(data) {
    //save of message in db
    var newMessage = new Messages({
      chatId: socket.room,
      postedBy: data.postedBy,
      messageContent: data.messageContent,
      messageCreationDate: data.messageCreationDate
    }).save(function(error, message) {
      console.log("c'est dans la db: -- ", message);
      // we tell the client to execute 'updatechat' with 2 parameters
      console.log("on va poster dans --", socket.room);
      if (error) {
        return res.status(422).send("error when saving message");
      }
      io.sockets
        .in(socket.room)
        .emit("updatechat", socket.username, data.messageContent);
    });
  });

  socket.on("switchRoom", function(newroom) {
    Chats.find({}, function(error, rooms) {
      if (error) {
        return res.status(422).send("error when fetching chats");
      }
      console.log("on veut quitter -- ", socket.room);
      socket.leave(socket.room);
      console.log("on veut rejoindre -- ", newroom);
      socket.join(newroom);

      socket.emit("updatechat", "SERVER", "you have connected to " + newroom);
      // sent message to OLD room
      socket.broadcast
        .to(socket.room)
        .emit("updatechat", "SERVER", socket.username + " has left this room");
      // update socket session room title
      socket.room = newroom;
      socket.broadcast
        .to(newroom)
        .emit(
          "updatechat",
          "SERVER",
          socket.username + " has joined this room"
        );
      // socket.broadcast.to(newroom).emit( 'initiatechat', socket.username, oldMessages );
      socket.emit("updaterooms", rooms, newroom);
      Messages.find({ chatId: newroom }, function(error, messages) {
        if (error) {
          return res.status(422).send("error when fetching old messages");
        }
        socket.emit("initiatechat", messages);
      });
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", function() {
    if (socket.room) {
      // remove the username from global usernames list
      delete usernames[socket.username];
      // update list of users in chat, client-side
      io.sockets.emit("updateusers", usernames);
      // echo globally that this client has left
      socket.broadcast.emit(
        "updatechat",
        "SERVER",
        socket.username + " has disconnected"
      );
      socket.leave(socket.room._id);
    }
  });
});

// -------------------------------------------

app.use(fileUpload());

// use of the express session
app.use(
  session({
    secret: "a4f8071f-c873-4447-8ee2",
    resave: false,
    saveUninitialized: false
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/profile", profile);
app.use("/pool_profile", pool_profile);
// app.use("/admin", admin);
// app.use("/jobOpp", jobOpp);
app.use("/job_opportunity", job_opportunity); // ajout

app.use("/", index);
app.use("/users", users);
app.use("/profile", profile);
app.use("/pool_profile", pool_profile);
app.use("/page_profile", page_profile);
app.use("/trombinoscope_5", trombinoscope_5);
app.use("/job_opportunity", job_opportunity);
app.use("/admin", admin);
app.use("/forum", forum);
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);

// server.listen(3000);

module.exports = app;
