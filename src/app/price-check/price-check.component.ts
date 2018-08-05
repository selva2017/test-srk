import { MatTabChangeEvent } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-check',
  templateUrl: './price-check.component.html',
  styleUrls: ['./price-check.component.css']
})
export class PriceCheckComponent implements OnInit {
  showPCRequests: boolean = true;
  showPCResponses: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  onLinkClick(event: MatTabChangeEvent) {
    if (event.tab.textLabel == "Price Check Requests") {
      this.showPCRequests = true;
      this.showPCResponses = false;
    }
    if (event.tab.textLabel == "Price Check Responses") {
      this.showPCResponses = true;
      this.showPCRequests = false;
    }
  }
}
