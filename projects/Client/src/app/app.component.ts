import { Component, OnInit } from '@angular/core';
import { SocketService } from "./socket-service/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cyber-barmen';

  constructor(private socket: SocketService) {

  }

  ngOnInit() {
    this.socket.getServerSentEvents()
      .subscribe(data => {
        console.log(data);
    })
  }
}
