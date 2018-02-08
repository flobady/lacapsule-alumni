var app = require('../app');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Messages = mongoose.model('messages');
io.on('connection', function(socket){
  console.log("user connected");
  socket.on('chat message', function(msg){
    console.log("message",msg)

    // on trigger le save en db:
    var newMessage = new Messages({
      postedBy: msg.postedBy,
      messageContent: msg.messageContent
    }).save(function(error, message){
      console.log("c'est dans la db");
    });
    io.emit('chat message', msg);
  });
});

module.exports = webSocket;
