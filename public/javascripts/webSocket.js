var socket = io.connect('http://localhost:3000');
      var username = document.getElementById('pseudo').value;
      var url_string = window.location.href;
      var url = new URL(url_string);
      var chatId = url.searchParams.get("id");
      var data = { username: username, chatId: chatId };


    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit('adduser', data);
      // socket.emit('adduser', prompt("What's your name?"));
    });

      // listener, whenever the server emits 'initiatechat', this loads old messages
      socket.on('initiatechat', function(oldMessages){
        oldMessages.forEach(function(message){
          return $('#conversation').append('<b>'+ message.postedBy + ':</b> ' + message.messageContent + '<br>');
        });
      });

      // listener, whenever the server emits 'updatechat', this updates the chat body
      socket.on('updatechat', function(username, data) {
        console.log("cuiiiir");
         $('#conversation').append('<b>'+ username + ':</b> ' + data + '<br>');
      });

      // listener, whenever the server emits 'updaterooms', this updates the room the client is in
      socket.on('updaterooms', function(rooms, current_room) {
        $('#rooms').empty();
        $.each(rooms, function(key, room) {
          if(room._id == current_room){
            $('#rooms').append('<div>' + room.chatName + '</div>');
          }
          else {
            $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+room._id+'\')">' + room.chatName + '</a></div>');
          }
        });
      });

      function switchRoom(room){
        console.log("on va vers la room -- ", room);
        socket.emit('switchRoom', room);
        $('#conversation').empty();
        // apres avoir cleaner on load les anciens messages
      }

      // on load of page
      $(function(){
        // when the client clicks SEND
        $('#datasend').click( function() {
          var message = $('#data').val();
          $('#data').val('');

          // var url_string = window.location.href;
          // var url = new URL(url_string);
          // var chatId = url.searchParams.get("id");
          var pseudo = document.getElementById('pseudo').value;

          var messageData = {
            chatId: "",
            postedBy: pseudo,
            messageContent: message,
            messageCreationDate: new Date()
          };

          console.log("objet message",messageData);
          // tell server to execute 'sendchat' and send along one parameter
          // socket.emit('sendchat', message);
          socket.emit('sendchat', messageData);
        });

        // when the client hits ENTER on their keyboard
        $('#data').keypress(function(e) {
          if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
          }
        });
      });
