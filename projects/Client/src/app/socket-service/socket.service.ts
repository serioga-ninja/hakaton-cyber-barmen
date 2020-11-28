
import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn:'root'
})
export class SocketService {
  private readonly URL = 'http://localhost:3002/stream';

  constructor(private zone: NgZone, private toastr: ToastrService) {

  }

  getEventSource(url: string): EventSource {
    return new EventSource(url)
  }

  getServerSentEvents() {
    return new Observable(obs => {
      const eventSource = this.getEventSource(this.URL);

      eventSource.onopen = event => {
        this.zone.run(() => {
          this.toastr.success('Server stream is running');
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
          this.toastr.error('Server stream error');
          obs.next(event)
        })
      }
    })
  }


}
