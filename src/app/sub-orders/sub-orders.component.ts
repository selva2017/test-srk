import { MatTabChangeEvent } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-orders',
  templateUrl: './sub-orders.component.html',
  styleUrls: ['./sub-orders.component.css']
})
export class SubOrdersComponent implements OnInit {

  showSO: boolean = true;
  showDeleteSO: boolean = false;
  showRestoreSO: boolean = false;
  showPlanned: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onLinkClick(event: MatTabChangeEvent) {
    if (event.tab.textLabel == "Delete Sales Orders") {
      this.showDeleteSO = true;
      this.showRestoreSO = false;
      this.showSO = false;
    }
    if (event.tab.textLabel == "Restore Sales Orders") {
      this.showRestoreSO = true;
      this.showDeleteSO = false;
      this.showSO = false;
    }
    if (event.tab.textLabel == "Planned") {
      this.showPlanned = true;
      this.showDeleteSO = false;
      this.showRestoreSO = false;
      this.showSO = false;
    }
  }
}
