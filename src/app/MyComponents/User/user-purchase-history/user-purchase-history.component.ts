import { Component, OnInit } from '@angular/core';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-purchase-history',
  templateUrl: './user-purchase-history.component.html',
  styleUrls: ['./user-purchase-history.component.css']
})
export class UserPurchaseHistoryComponent implements OnInit {

  listOfPurchases:any;
  panelOpenState=false;
  testDate:Date;
  selectedSortOption;
  selectedOrder = 'asc';
  
  constructor(private userService:UserServiceService, private loaderService: LoaderServiceService) { }

  getDuplicateItemQuantity(itemId,index) {
    let count=0;
    for(let item of this.listOfPurchases[index].itemForPurchaseHistoryList) {if(item.itemId==itemId) count++;}
    return count;
  }

  getTotalCost(index) {
    let totalCost=0;
    for(let item of this.listOfPurchases[index].itemForPurchaseHistoryList) {totalCost=totalCost+item.unitPrice;}
    return totalCost;
  }

  ngOnInit(): void {
      this.loaderService.setShowLoader(true);
      this.userService.getListOfPurchases().subscribe(data=>{this.listOfPurchases=data;this.loaderService.setShowLoader(false);},error=>{console.log('error from user purchase history Comp',error);});
  }

}
