import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>
    <input id="jwt-token" type="text" placeholder="JWT Token">
    <button id="btn-connect">Connect</button>
    <br />
    <span id="server-status">offline</span>

    <ul id="clients-ul">
      <li>HELLO</li>
    </ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Messages">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if ( jwtToken.value.trim().length <= 0 ) return alert('Enter a valid JWT Token');
  connectToServer(jwtToken.value);

});

// connectToServer();
