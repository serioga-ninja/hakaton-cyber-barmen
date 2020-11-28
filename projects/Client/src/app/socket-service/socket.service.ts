
import { Injectable, NgZone } from '@angular/core';
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../environments/environment";

const baseStreamAPI = environment.baseStreamAPI ? environment.baseStreamAPI : 'http://localhost:3002/stream/';

@Injectable({
  providedIn:'root'
})
export class SocketService {
    constructor(private zone: NgZone, private toastr: ToastrService) {

  }

  getEventSource(url: string): EventSource {
    return new EventSource(url)
  }

  getServerSentEvents() {
    return new Observable(obs => {
      const eventSource = this.getEventSource(baseStreamAPI);

      eventSource.onopen = event => {
        this.zone.run(() => {
          this.toastr.success('Server stream is running');
          obs.next(event);
        })
      }

      eventSource.onmessage = event => {
        this.zone.run(() => {
          const data = JSON.parse(event.data);

          obs.next(data);
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
