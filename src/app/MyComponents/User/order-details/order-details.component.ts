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
  showLoader:boolean = true;
  paymentReceived = false;

  constructor(private userService:UserServiceService,private router:Router) {this.latestPurchaseDetails={id:'',purchaseDate:'',itemList:[{itemId:'',itemName:'',itemCompany:'',itemCategory:''}]} }

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
    setTimeout(()=>{
      this.showLoader=false;
      setTimeout(()=>{
        this.paymentReceived=true;
      },4000)
    }, 3000);
  }

}
