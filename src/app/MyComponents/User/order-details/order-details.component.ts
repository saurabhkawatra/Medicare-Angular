import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  latestPurchaseDetails:any;

  constructor(private userService:UserServiceService,private router:Router) { }

  getDuplicateItemQuantity(itemId) {
    let count=0;
    for(let item of this.latestPurchaseDetails.itemList) {if(item.itemId==itemId) count++;}
    return count;
  }

  getTotalCost() {
    let totalCost=0;
    for(let item of this.latestPurchaseDetails.itemList) {totalCost=totalCost+item.unitPrice;}
    return totalCost;
  }

  ngOnInit(): void {
    this.userService.getLatestPurchaseDetails().subscribe(data=>{this.latestPurchaseDetails=data;},error=>{console.log('error from order details comp',error);});
  }

}
