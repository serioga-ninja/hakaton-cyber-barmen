import { Component, OnInit } from '@angular/core';
import { SocketService } from "./socket-service/socket.service";
import { EventNotifications, EventTypes, IEventStream } from "./models";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cyber-barmen';

  constructor(private socket: SocketService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.socket.getServerSentEvents()
      .subscribe((data: IEventStream) => {
        if (data.eventType) {
          if (data.eventType == EventTypes.BOTTLE_IS_EMPTY) {
            this.toastrService.warning(EventNotifications[data.eventType])
            return;
          }

          this.toastrService.success(EventNotifications[data.eventType])
        }
      }
    )
  }
}
