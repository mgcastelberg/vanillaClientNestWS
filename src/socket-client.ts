import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io')

    const socket = manager.socket('/');

    // console.log(socket);
    addListener(socket);
    
}

const addListener = (socket:Socket) => {

    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUL = document.querySelector('#clients-ul')!;
    // TODO: clients-ul


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

}