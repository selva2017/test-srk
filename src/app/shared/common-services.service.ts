import { Injectable } from '@angular/core';

@Injectable()
export class CommonServicesService {
  http: any;

  constructor() { }

  displayIndianFormat(amount: number) {
    // return "success";
    return Number(Math.round(amount)).toLocaleString('en-IN');
  }

  showInThousandsIndianFormat(amount: number) {
    // return "success";
    return Number(Math.round(amount / 1000)).toLocaleString('en-IN');
  }

  displayINR(amount: number) {
    // return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(Math.round(amount));
  }

}
