import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css']
})
export class UserCheckoutComponent implements OnInit {

  itemsInCart:any[];
  filteredItemsIncart:any[];
  toggleDash=true;
  randomInputCount=0;
  @ViewChild('dashboard') dashboard:UserDashboardComponent;
  math=Math;

  constructor(private userService:UserServiceService) {this.itemsInCart=[{}]; }

  getOrderTotal(){
    let orderTotal=0;
    for(let item of this.itemsInCart) {
      orderTotal=orderTotal+item.unitPrice;
    }
    orderTotal=Math.ceil(orderTotal*100)/100;
    return orderTotal;
  }

  getButtonStatus() {
    if(this.getOrderTotal()==0)
    return "disabled";
    else
    return "";
  }

  decreaseItemQuan(item, itemId) {
      console.log('decrease Item Quantity itemId ::',itemId,' item :: ',item);
      this.userService.removeItemFromCart(item).subscribe(data=>{
        console.log('item removed data[\'message\']=',data['message']);
        this.ngOnInit();
        this.toggleDash=false; this.randomInputCount++;
        setTimeout(() => {
          this.toggleDash=true; this.randomInputCount++;
        }, 1);
      },
        error=>{console.log('error from increaseItemquan() user-checkout comp',error);
      });
  }

  increaseItemQuan(item,itemId) {
      console.log('increase Item Quantity itemId ::',itemId,' item :: ',item);
      this.userService.addItemToCart(item).subscribe(data=>{
        console.log('item added data[\'message\']=',data['message']);
        this.ngOnInit();
        this.toggleDash=false; this.randomInputCount++;
        setTimeout(() => {
          this.toggleDash=true; this.randomInputCount++;
        }, 1);
      },
        error=>{console.log('error from increaseItemquan() user-checkout comp',error);
      });
  }

  getDuplicateItemQuantityInCart(itemId) {
    let itemCount=0;
    this.itemsInCart.forEach((item)=>{if(item.itemId==itemId) itemCount++;});
    return itemCount;
  }

  ngOnInit(): void {
    this.userService.getItemsInCart().subscribe(
      data=>{
        this.itemsInCart=data;
        this.filteredItemsIncart=data.filter((item)=>{
          let check=data.indexOf(item);
          for(let i=0;i<data.indexOf(item);i++) {
                if(data[i].itemId!=item.itemId) {check--;}
              }
          if(check==0) return true;
          else return false;
        });
        },error=>{console.log('error from ngoninit',error);});
  }

}
