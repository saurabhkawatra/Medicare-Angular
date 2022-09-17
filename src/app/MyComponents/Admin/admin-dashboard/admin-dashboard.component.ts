import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @Input('someInput') someInput:String;
  @ViewChild('cartUpperElement') cartUpperElement:ElementRef;
  @ViewChild('cartLowerElement') cartLowerElement:ElementRef;
  user:any;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;
  itemsInCart:any[];
  isCartVisible:boolean = false;

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
  onCartCloseClick() {
    console.log('Cart Mouse Leave...');
    this.isCartVisible=false;
  }
  getTotalCost(){let sum=0; for(let item of this.itemsInCart){sum=sum+item.unitPrice;} return sum;}
  getItemQuantity(itemId) {let q=0;for(let item of this.itemsInCart){if(item.itemId==itemId)q++;}return q;}


  constructor(private router:Router,private service:BasicServicesService,
    private snkbar:MatSnackBar,private adminService:AdminServiceService,private userService:UserServiceService,private renderer:Renderer2) {
      this.user={authority:'',cart:{itemsInCart:{length:''}},firstName:'',lastName:''};
    }

  ngOnInit(): void {
    this.adminService.getuserdetails().subscribe(data=>{this.user=data;console.log(this.user);},error=>{console.log('Error in AdminDashboard',error);});
    this.userService.getItemsInCart().subscribe(data=>{this.itemsInCart=data;},error=>{console.log('error from User dashboard getitemsinCart',error);});
    this.renderer.listen('window','click',(e:Event) => {
      console.log('TESTING ---->',this.cartUpperElement,this.cartLowerElement);
      if(this.cartLowerElement)
      if( !(this.cartUpperElement.nativeElement.contains(e.target)) && !(this.cartLowerElement.nativeElement.contains(e.target))) {
        this.isCartVisible = false;
      }
    });
  }

}
