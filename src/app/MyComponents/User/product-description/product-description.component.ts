import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  routeProductId;
  receivedItem;
  itemsInCart:any[];
  givesomestringinputtorefreshdashboard='true';
  currentSelectedImage = 0;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private userService:UserServiceService, private loaderService: LoaderServiceService) {this.receivedItem={itemId:''};this.itemsInCart=[{}]; }

  increaseQuantityOfThisItem() {this.userService.addItemToCart(this.receivedItem).subscribe(data=>{ this.ngOnInit();},error=>{console.log('error in increaseQuantityofthisitem() productdescription',error);});}
  decreaseQuantityOfThisItem() {this.userService.removeItemFromCart(this.receivedItem).subscribe(data=>{ this.ngOnInit();},error=>{console.log('error in increaseQuantityofthisitem() productdescription',error);});}

  numOfThisItemInCart() {let n=0;for(let item of this.itemsInCart){if(item.itemId==this.routeProductId) n++;} return n;}

  ngOnInit(): void {
    this.loaderService.setShowLoader(true);
    window.scrollTo(0,0);
    if(this.givesomestringinputtorefreshdashboard=='true') {this.givesomestringinputtorefreshdashboard='false';} else {this.givesomestringinputtorefreshdashboard='true';}
    this.routeProductId=this.activatedRoute.snapshot.params['itemId'];
    this.userService.getItemByitemId(this.routeProductId).subscribe(data=>{this.receivedItem=data;},error=>{console.log('error from product description page..ngonInit...Automatic Redirecting to / url',error);this.router.navigateByUrl('/');});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;this.loaderService.setShowLoader(false);},error=>{console.log('error from Product description itemsinCart ngOnInit',error);});
  }

  imageSelectClick(imageNo) {
    this.currentSelectedImage = imageNo;
  }

  onPreviousImageClick() {
    if(this.currentSelectedImage == 0) {
      this.currentSelectedImage = this.receivedItem.itemImageUrl?.split('<::||||::>').length - 1;
    } else {
      this.currentSelectedImage--;
    }
  }

  onNextImageClick() {
    if(this.currentSelectedImage == this.receivedItem.itemImageUrl?.split('<::||||::>').length - 1) {
      this.currentSelectedImage = 0;
    } else {
      this.currentSelectedImage++;
    }
  }

}
