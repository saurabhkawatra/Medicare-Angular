import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { User } from '../../MODELS/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @Input('someInput') someInput:String;
  user:any;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;
  cartHoverBox:Boolean=false;
  itemsInCart:any[];

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
  getTotalCost(){let sum=0; for(let item of this.itemsInCart){sum=sum+item.unitPrice;} return sum;}
  getItemQuantity(itemId) {let q=0;for(let item of this.itemsInCart){if(item.itemId==itemId)q++;}return q;}


  constructor(private router:Router,private service:BasicServicesService,
    private snkbar:MatSnackBar,private adminService:AdminServiceService,private userService:UserServiceService) { 
      this.user={authority:'',cart:{itemsInCart:{length:''}},firstName:'',lastName:''};
    }

  ngOnInit(): void {
    this.adminService.getuserdetails().subscribe(data=>{this.user=data;console.log(this.user);},error=>{console.log('Error in AdminDashboard',error);});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;},error=>{console.log('error from User dashboard getitemsinCart',error);});
  }

}
