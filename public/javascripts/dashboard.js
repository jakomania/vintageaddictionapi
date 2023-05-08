const socket = io();
let username = document.cookie.split('; ')
    .find(cookie => cookie.startsWith('username='))
    ?.split('=')[1];

// No va perquè no sap quin és el email de l'usuari i no sap la seua room

socket.on('rooms:status', (data) => {
    const myRoom = getMyRoom(data);

    data.forEach(room => {
        const container = document.getElementById(room.id);


        if (myRoom) {
            if (myRoom.id === room.id) {
                container.querySelectorAll('.room-avatar')[0].style.opacity = 1;
                container.querySelectorAll('.waiting')[0].classList.remove('hidden');

                room.users.length === 2
                    ? container.querySelectorAll('.play')[0].classList.remove('hidden')
                    : container.querySelectorAll('.play')[0].classList.add('hidden');

                container.querySelectorAll('.leave')[0].classList.remove('hidden');
                container.querySelectorAll('.full')[0].classList.add('hidden');
                container.querySelectorAll('.empty')[0].classList.add('hidden');
            } else {
                container.querySelectorAll('.room-avatar')[0].style.opacity = 0.5;

                room.users.length === 1
                    ? container.querySelectorAll('.waiting')[0].classList.remove('hidden')
                    : container.querySelectorAll('.waiting')[0].classList.add('hidden');

                room.users.length === 2
                    ? container.querySelectorAll('.full')[0].classList.remove('hidden')
                    : container.querySelectorAll('.full')[0].classList.add('hidden');

                container.querySelectorAll('.play')[0].classList.add('hidden');
                container.querySelectorAll('.leave')[0].classList.add('hidden');

                room.users.length === 0
                    ? container.querySelectorAll('.empty')[0].classList.remove('hidden')
                    : container.querySelectorAll('.empty')[0].classList.add('hidden')

            }
        } else {
            container.querySelectorAll('.room-avatar')[0].style.opacity = 1;
            container.querySelectorAll('.play')[0].classList.add('hidden');
            container.querySelectorAll('.leave')[0].classList.add('hidden');

            room.users.length === 1
                ? container.querySelectorAll('.waiting')[0].classList.remove('hidden')
                : container.querySelectorAll('.waiting')[0].classList.add('hidden');

            room.users.length === 2
                ? container.querySelectorAll('.full')[0].classList.remove('hidden')
                : container.querySelectorAll('.full')[0].classList.add('hidden');

            room.users.length === 0
                ? container.querySelectorAll('.empty')[0].classList.remove('hidden')
                : container.querySelectorAll('.empty')[0].classList.add('hidden')
        }
    });

});

/**
 * Returns the room where the user joined or undefined in case is not in any room
 * @param rooms
 */
function getMyRoom(rooms) {
    return rooms
        .filter(room =>
            room.users.filter(user => user.username === username).length > 0
        )[0];
}

function leaveRoom() {
    socket.emit('rooms:leave');
}


//Add drag & drop capabilties
const img = document.getElementById("avatar");
img.addEventListener('dragstart', dragStart);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const rooms = document.querySelectorAll(".room-avatar");
rooms.forEach(room => {
    room.addEventListener('dragenter', dragEnter)
    room.addEventListener('dragover', dragOver);
    room.addEventListener('dragleave', dragLeave);
    room.addEventListener('drop', drop);

});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');

}

function drop(e) {
    const roomId = e.target.parentElement.id;
    socket.emit('rooms:join', roomId);
}

function logOut() {
    localStorage.clear();
    location.replace("/logout")
}