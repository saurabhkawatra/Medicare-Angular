import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input()item:any;
  @Output('addButtonClickOnItemCard') addButtonClickOnItemCard = new EventEmitter<any>();
  itemsInCart

  constructor(private snkbar:MatSnackBar,private userService:UserServiceService) { }

  

  addToCart(item) {
      
      this.userService.addItemToCart(item).subscribe(data=>{
        this.snkbar.open(data['message'],'OK',{horizontalPosition:'center',verticalPosition:'bottom',duration:4000});
        this.snkbar.open(data['message'],'OK',{horizontalPosition:'center',verticalPosition:'bottom',duration:4000});
        this.addButtonClickOnItemCard.emit(item);
        this.ngOnInit();
      },error=>{console.log('error from addtocart() item-card-compo',error);});
  }

  decreaseItemQuan(item, itemId) {
    console.log('decrease Item Quantity itemId ::',itemId,' item :: ',item);
    this.userService.removeItemFromCart(item).subscribe(data=>{
      console.log('item removed data[\'message\']=',data['message']);
      this.addButtonClickOnItemCard.emit(item);
      this.ngOnInit();
    },
      error=>{console.log('error from increaseItemquan() user-checkout comp',error);
    });
}

increaseItemQuan(item,itemId) {
    console.log('increase Item Quantity itemId ::',itemId,' item :: ',item);
    this.userService.addItemToCart(item).subscribe(data=>{
      console.log('item added data[\'message\']=',data['message']);
      this.addButtonClickOnItemCard.emit(item);
      this.ngOnInit();
    },
      error=>{console.log('error from increaseItemquan() user-checkout comp',error);
    });
}

getDuplicateItemQuantityInCart(itemId) {
  let itemCount=0;
  if(this.itemsInCart!=null)
  this.itemsInCart.forEach((item)=>{if(item.itemId==itemId) itemCount++;});
  return itemCount;
}


  ngOnInit(): void {
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;},error=>{console.log('error from item-card component',error);});
  }

}
