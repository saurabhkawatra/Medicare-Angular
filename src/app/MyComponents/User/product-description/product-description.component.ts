import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private userService:UserServiceService) {this.receivedItem={itemId:''};this.itemsInCart=[{}]; }

  increaseQuantityOfThisItem() {this.userService.addItemToCart(this.receivedItem).subscribe(data=>{ this.ngOnInit();},error=>{console.log('error in increaseQuantityofthisitem() productdescription',error);});}
  decreaseQuantityOfThisItem() {this.userService.removeItemFromCart(this.receivedItem).subscribe(data=>{ this.ngOnInit();},error=>{console.log('error in increaseQuantityofthisitem() productdescription',error);});}

  numOfThisItemInCart() {let n=0;for(let item of this.itemsInCart){if(item.itemId==this.routeProductId) n++;} return n;}

  ngOnInit(): void {
    window.scrollTo(0,0);
    if(this.givesomestringinputtorefreshdashboard=='true') {this.givesomestringinputtorefreshdashboard='false';} else {this.givesomestringinputtorefreshdashboard='true';}
    this.routeProductId=this.activatedRoute.snapshot.params['itemId'];
    this.userService.getItemByitemId(this.routeProductId).subscribe(data=>{this.receivedItem=data;},error=>{console.log('error from product description page..ngonInit...Automatic Redirecting to / url',error);this.router.navigateByUrl('/');});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;},error=>{console.log('error from Product description itemsinCart ngOnInit',error);});
  }

}
