
import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";


@Injectable({
  providedIn:'root'
})
export class SocketService {
  private readonly URL = 'http://localhost:3000/stream';

  constructor(private zone: NgZone) {

  }

  getEventSource(url: string): EventSource {
    return new EventSource(url)
  }

  getServerSentEvents() {
    return new Observable(obs => {
      const eventSource = this.getEventSource(this.URL);

      eventSource.onopen = event => {
        this.zone.run(() => {
          console.log('SSE is running');
          obs.next(event);
        })
      }

      eventSource.onmessage = event => {
        this.zone.run(() => {
          obs.next(event);
        })
      }

      eventSource.onerror = event => {
        this.zone.run(() => {
          console.log('SSE error: ', event);
          obs.next(event)
        })
      }
    })
  }


}
