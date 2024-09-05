import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io')

    const socket = manager.socket('/');

    // console.log(socket);
    addListener(socket);
    
}

const addListener = (socket:Socket) => {

    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    // on:Para escuchar, emit:Para enviar
    socket.on('connect', () => {
        console.log('connected');
        serverStatusLabel.textContent = 'connected';
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        serverStatusLabel.textContent = 'disconnect';
    });

}