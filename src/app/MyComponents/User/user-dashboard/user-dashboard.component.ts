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

  constructor(private userService:UserServiceService, private service:BasicServicesService,private snkbar:MatSnackBar,private router:Router) { }

  logout() {
    this.service.logout().subscribe(data =>{
                  console.log(data['message']);
                  localStorage.removeItem('authToken');
                  this.snkbar.open(data['message'],'OK',{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom',duration:4000});
                  this.router.navigate(['/']);
              },error=>{console.log(error)});
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(data=>{this.user=data;console.clear();},error=>{console.log('error from user dashboard',error)});
  }

  ngOnChanges() {
    this.ngOnInit();
  }


}
