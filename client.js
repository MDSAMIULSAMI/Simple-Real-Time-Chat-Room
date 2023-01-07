const socket = io('http://localhost:3000');

const messagebox = document.getElementById('send-cont');
const messageInp = document.getElementById('messInp')
const messageCon = document.querySelector('.cont')


const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('mess')
    messageElement.classList.add(position)
    messageCon.append(messageElement)
}

const name = prompt("Enter your Name to Join")
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

messagebox.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`${name}: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('leave', name => {
    append(`${name} left the chat`, 'left')
})