import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  @Input('someInput') someInput:String;
  @ViewChild('cartUpperElement') cartUpperElement:ElementRef;
  @ViewChild('cartLowerElement') cartLowerElement:ElementRef;
  user:any;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;
  isCartVisible:boolean=false;
  itemsInCart:any[];
  totalCost;

  constructor(private userService:UserServiceService, private service:BasicServicesService,private snkbar:MatSnackBar,private router:Router,private renderer:Renderer2) { this.user={authority:'',cart:{itemsInCart:{length:''}},firstName:'',lastName:''};}

  logout() {
    this.service.logout().subscribe(data =>{
                  console.log(data['message']);
                  sessionStorage.removeItem('authToken');
                  this.snkbar.open(data['message'],'OK',{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom',duration:4000});
                  this.router.navigate(['/']);
              },error=>{console.log(error)});
  }

  cartMouseEnter() {
    console.log('Cart Mouse Enter...');
    this.isCartVisible=true;
  }
  cartMouseLeave() {
    console.log('Cart Mouse Leave...');
    this.isCartVisible=false;
  }
  getTotalCost(){let sum=0; for(let item of this.itemsInCart) {sum = sum + parseFloat(item.unitPrice);} sum=Math.ceil(sum*100)/100; return sum;}
  getItemQuantity(itemId) {let q=0;for(let item of this.itemsInCart){if(item.itemId==itemId)q++;}return q;}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(data=>{this.user=data;},error=>{console.log('error from user dashboard',error);});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;this.totalCost=this.getTotalCost();},error=>{console.log('error from User dashboard getitemsinCart',error);});
    this.renderer.listen('window','click',(e:Event) => {
      if( !(this.cartUpperElement.nativeElement.contains(e.target)) && !(this.cartLowerElement.nativeElement.contains(e.target))) {
        this.isCartVisible = false;
      }
    });
    
  }

  ngOnChanges() {
    this.ngOnInit();
  }


}
