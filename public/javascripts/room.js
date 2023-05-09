let username = document.cookie.split('; ')
    .find(cookie => cookie.startsWith('username='))
    ?.split('=')[1];
var socket = io();

socket.on('ocultaWinner', function() {
    const win = document.getElementById('win');
    win.classList.add('hidden');
    const lost = document.getElementById('lost');
    lost.classList.add('hidden');
});

setTimeout(() => {
    console.log(window.roomId);
    socket.emit("rooms:play", {roomId: window.roomId});
}, 100);

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
              const win = document.getElementById('win');
              win.classList.remove('hidden');
              console.log('you won!');

          } else {
              const lost = document.getElementById('lost');
              lost.classList.remove('hidden');
              console.log('enemy won!');

          }
      }
   });
});



