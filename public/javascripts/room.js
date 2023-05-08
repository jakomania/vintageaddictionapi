let username = document.cookie.split('; ')
    .find(cookie => cookie.startsWith('username='))
    ?.split('=')[1];
var socket = io();

setTimeout(() => {
    console.log(window.roomId);
    socket.emit("rooms:play", {roomId: window.roomId});
}, 1000);

function Whitecanvas (x,y) {
    socket.emit('room:click', {
        roomId: window.roomId, x, y
    });
}

socket.on('room:state', (state) => {

   state.forEach(user => {
      const color = user.color;
      user.owner.forEach(({x,y}) => {
          document.getElementById(`${x}${y}`).style.backgroundColor = color;
       });

      if (user.winner) {
          if (user.username === username) {
              console.log('you won!');

          } else {
              console.log('enemy won!');

          }
      }
   });
});
