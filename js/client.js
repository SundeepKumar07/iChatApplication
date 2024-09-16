document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8000');

    const form = document.getElementById('send-container');
    const messageInput = document.getElementById('messageinp');
    const messageContainer = document.querySelector('.container');

    const append = (message, position) => {
        console.log(`Appending message: ${message} at position: ${position}`);
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        console.log(`Sending message: ${message}`);
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    });

    const name = prompt('Enter your Name to join');
    socket.emit('new-user-joined', name);

    socket.on('user-joined', name => {
        // console.log(`${name} joined the chat`);
        append(`${name} joined the chat`, 'right');
    });

    socket.on('receive', data => {
        // console.log(`Received message from ${data.name}: ${data.message}`);
        append(`${data.name}: ${data.message}`, 'left');
    });
});
