import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';
import { PopUpService } from 'src/app/Services/CommonServices/pop-up.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input()item:any;
  @Output('addButtonClickOnItemCard') addButtonClickOnItemCard = new EventEmitter<any>();
  @Input() itemsInCart;

  currentImageNo = 0;

  constructor(private snkbar:MatSnackBar,private userService:UserServiceService,private popUpService: PopUpService, private loaderService: LoaderServiceService) { }



  addToCart(item) {
      this.loaderService.setShowLoader(true);
      this.userService.addItemToCart(item).subscribe(data=>{
        this.snkbar.open(data['message'],'OK',{horizontalPosition:'center',verticalPosition:'bottom',duration:4000});
        this.popUpService.showPopUpBox(data['message'],4000);
        this.addButtonClickOnItemCard.emit(item);
        this.ngOnInit();
        this.loaderService.setShowLoader(false);
      },error=>{console.log('error from addtocart() item-card-compo',error); this.loaderService.setShowLoader(false);});
  }

  decreaseItemQuan(item, itemId) {
    console.log('decrease Item Quantity itemId ::',itemId,' item :: ',item);
    this.loaderService.setShowLoader(true);
    this.userService.removeItemFromCart(item).subscribe(data=>{
      console.log('item removed data[\'message\']=',data['message']);
      this.addButtonClickOnItemCard.emit(item);
      this.ngOnInit();
      this.loaderService.setShowLoader(false);
    },
      error=>{
        console.log('error from increaseItemquan() user-checkout comp',error);
        this.loaderService.setShowLoader(false);
    });
}

increaseItemQuan(item,itemId) {
    console.log('increase Item Quantity itemId ::',itemId,' item :: ',item);
    this.loaderService.setShowLoader(true);
    this.userService.addItemToCart(item).subscribe(data=>{
      console.log('item added data[\'message\']=',data['message']);
      this.addButtonClickOnItemCard.emit(item);
      this.ngOnInit();
      this.loaderService.setShowLoader(false);
    },
      error=>{
        console.log('error from increaseItemquan() user-checkout comp',error);
        this.loaderService.setShowLoader(false);
    });
}

getDuplicateItemQuantityInCart(itemId) {
  let itemCount=0;
  if(this.itemsInCart!=null)
  this.itemsInCart.forEach((item)=>{if(item.itemId==itemId) itemCount++;});
  return itemCount;
}

isMultipleImagesExist() : boolean {
  return this.item.itemImageUrl?.split('<::||||::>').length > 1;
}

previousImageClick() {
  if(this.currentImageNo == 0) {
    this.currentImageNo = this.item.itemImageUrl?.split('<::||||::>').length - 1;
  } else {
    this.currentImageNo--;
  }
}

nextImageClick() {
  if(this.currentImageNo + 1 == this.item.itemImageUrl?.split('<::||||::>').length) {
    this.currentImageNo = 0;
  } else {
    this.currentImageNo++;
  }
}


  ngOnInit(): void {
    // this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;},error=>{console.log('error from item-card component',error);});
  }

}
