import { Manager, Socket } from 'socket.io-client'

let socket: Socket;

export const connectToServer = ( token: string ) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io',{
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    socket?.removeAllListeners(); // Si existe el socket, remueve todos los listeners
    socket = manager.socket('/');

    // console.log(socket);
    addListener();
    
}

const addListener = () => {

    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUL = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesul = document.querySelector<HTMLUListElement>('#messages-ul')!;

    // on:Para escuchar, emit:Para enviar
    socket.on('connect', () => {
        console.log('connected');
        serverStatusLabel.textContent = 'connected';
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        serverStatusLabel.textContent = 'disconnect';
    });

    // Escuchar la lista de clientes
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(client => {
            clientsHtml += `<li>${client}</li>`
        });
        clientsUL.innerHTML = clientsHtml;
        console.log(clients);
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;
        console.log({ id: 'YO!!', message: messageInput.value });
        // Para emitir un evento
        socket.emit('message-from-client', { id: 'YO!!', message: messageInput.value });
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        // console.log({ payload });
        const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesul.append(li);
    });
}