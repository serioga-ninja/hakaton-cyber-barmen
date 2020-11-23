import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  private url: UrlSegment[];
  get showBackButton(): boolean {
    // console.log(this.url);
    return this.url[this.url.length-1].toString() !== 'admin';
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.url.subscribe(data => {
      console.log(data);
      this.url = data;
    });
  }

  ngOnInit(): void {
  }

  back(): void {
    this.location.back()
  }
}
