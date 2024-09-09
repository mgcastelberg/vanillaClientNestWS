import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <span id="server-status">offline</span>

    <ul id="clients-ul">
      <li>HELLO</li>
    </ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Messages">
    </form>

  </div>
`

connectToServer();
