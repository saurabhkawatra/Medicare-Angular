import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { User } from '../../MODELS/user';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  user:any;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;

  logout() {
    this.service.logout().subscribe(data =>{
                  console.log(data['message']);
                  localStorage.removeItem('authToken');
                  this.snkbar.open(data['message'],'OK',{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom',duration:4000});
                  this.router.navigate(['/']);
              },error=>{console.log(error)});
  }


  constructor(private router:Router,private service:BasicServicesService,
    private snkbar:MatSnackBar,private adminService:AdminServiceService) { 
    }

  ngOnInit(): void {
    this.adminService.getuserdetails().subscribe(data=>{this.user=data;console.clear();console.log(this.user);},error=>{console.log('Error in AdminDashboard',error);});
  }

}
