import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { resourceUsage } from 'process';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { User } from '../../MODELS/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  @Input('someInput') someInput:String;
  user:any;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;
  cartHoverBox:Boolean=false;
  itemsInCart:any[];
  totalCost;

  constructor(private userService:UserServiceService, private service:BasicServicesService,private snkbar:MatSnackBar,private router:Router) { this.user={authority:'',cart:{itemsInCart:{length:''}},firstName:'',lastName:''};}

  logout() {
    this.service.logout().subscribe(data =>{
                  console.log(data['message']);
                  localStorage.removeItem('authToken');
                  this.snkbar.open(data['message'],'OK',{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom',duration:4000});
                  this.router.navigate(['/']);
              },error=>{console.log(error)});
  }

  cartMouseEnter() {
    console.log('Cart Mouse Enter...');
    this.cartHoverBox=true;
  }
  cartMouseLeave() {
    console.log('Cart Mouse Leave...');
    this.cartHoverBox=false;
  }
  getTotalCost(){let sum=0; for(let item of this.itemsInCart) {sum = sum + parseFloat(item.unitPrice);} sum=Math.ceil(sum*100)/100; return sum;}
  getItemQuantity(itemId) {let q=0;for(let item of this.itemsInCart){if(item.itemId==itemId)q++;}return q;}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(data=>{this.user=data;},error=>{console.log('error from user dashboard',error);});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;this.totalCost=this.getTotalCost();},error=>{console.log('error from User dashboard getitemsinCart',error);});
    
  }

  ngOnChanges() {
    this.ngOnInit();
  }


}
