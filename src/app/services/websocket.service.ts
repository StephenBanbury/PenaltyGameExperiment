import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

export const WS_ENDPOINT = environment.wsEndpoint;


export interface IncomingMessage {
  // assume that we receive serialized json that adheres to this interface
}

export interface OutgoingMessage {
  // we send serialized json that adheres to this interface
  Area: string;
  Strength: number
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  readonly incoming = new Subject<IncomingMessage>();

  private buffer: OutgoingMessage[] | undefined;
  private socket: WebSocket | undefined;


  constructor() { }

  connect(): void {
    this.socket = new WebSocket(WS_ENDPOINT);
    this.buffer = [];
    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('error', this.onError);
  }

  send(msg: OutgoingMessage): void {
    if (!this.socket) {
      throw new Error('websocket not connected');
    }
    if (this.buffer) {
      this.buffer.push(msg);
    } else {
      this.socket.send(JSON.stringify(msg));
    }
  }

  private onMessage = (event: MessageEvent): void => {
    const msg = event.data; // JSON.parse(event.data);
    console.log(msg);
    this.incoming.next(msg);
  };

  private onOpen = (event: Event): void => {
    console.log('websocket opened', event);
    const buffered = this.buffer;
    if (!buffered) {
      return;
    }
    this.buffer = undefined;
    for (const msg of buffered) {
      this.send(msg);
    }
  };

  private onError = (event: Event): void => {
    console.error('websocket error', event);
  };

  private onClose = (event: CloseEvent): void => {
    console.info('websocket closed', event);
  };
}
