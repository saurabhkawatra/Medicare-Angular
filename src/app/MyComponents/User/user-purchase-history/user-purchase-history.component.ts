import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.css']
})
export class UserPurchaseHistoryComponent implements OnInit {

  listOfPurchases:any;
  panelOpenState=false;
  
  constructor(private userService:UserServiceService) { }

  getDuplicateItemQuantity(itemId,index) {
    let count=0;
    for(let item of this.listOfPurchases[index].itemList) {if(item.itemId==itemId) count++;}
    return count;
  }

  getTotalCost(index) {
    let totalCost=0;
    for(let item of this.listOfPurchases[index].itemList) {totalCost=totalCost+item.unitPrice;}
    return totalCost;
  }

  ngOnInit(): void {
      this.userService.getListOfPurchases().subscribe(data=>{this.listOfPurchases=data;},error=>{console.log('error from user purchase history Comp',error);});
  }

}
