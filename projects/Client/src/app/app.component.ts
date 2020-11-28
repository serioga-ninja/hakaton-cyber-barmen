import { Component, OnInit } from '@angular/core';
import { SocketService } from "./socket-service/socket.service";
import { EventNotifications, IEventStream } from "./models";
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
          this.toastrService.success(EventNotifications[data.eventType])
        }
      }
    )
  }
}
