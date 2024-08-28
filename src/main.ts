import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <span>offline</span>
  </div>
`

connectToServer();
