import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { User } from '../MODELS/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  reg_btn_disable:String="false";
  isRegistrationSuccess:Boolean=false;
  message:any;
  emailcheck:any;
  usernamecheck:any;
  phonenocheck:any;
  user:User=new User();
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;


  incorrectvaluescheck() {
    if(this.user.firstName==null){this.user.firstName="";}
    if(this.user.lastName==null){this.user.lastName="";}
    if(this.user.password==null){this.user.password="";}
  }

  registerclick() {
    console.log('registerclick() executed');
    this.keyupemail();
    this.keyupusername();
    this.keyupphoneno();

    if(this.emailcheck=='EmailAvailable'&&this.usernamecheck=='UsernameAvailable'&&this.phonenocheck=='PhonenoAvailable'&&this.user.dateOfBirth&&this.user.dateOfBirth!=null&&this.user.firstName!=null&&this.user.firstName!=""&&this.user.lastName!=null&&this.user.lastName!=""&&this.user.password!=null&&this.user.password!="")
    this.service.doRegistration(this.user).subscribe((response)=>{this.message=response;if(response=="Registration Success"){this.isRegistrationSuccess=true;console.log(this.message);this.snkbar.open(this.message,"OK",{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom',duration:4000})}});
    else {
      this.incorrectvaluescheck();
      this.snkbar.open("Invalid Form Details!","OK",{horizontalPosition:'center',verticalPosition:'top',duration:4000});
    }
    
  }
  keyupemail() {
    if(this.user.primaryEmail!=null&&this.user.primaryEmail!=''&&this.user.primaryEmail!=undefined) {
              this.service.checkemail(this.user.primaryEmail).subscribe((response)=>{
                this.emailcheck=response;
                console.log(this.emailcheck);
                if(this.emailcheck=="EmailDuplicate") {}
                else {}
              });
    } else {this.user.primaryEmail="";this.emailcheck="";}
    
  }
  keyupusername() {
    if(this.user.username!=null&&this.user.username!='')
    this.service.checkusername(this.user.username).subscribe((response)=>this.usernamecheck=response);
    else {this.user.username="";this.usernamecheck="";}
  }
  keyupphoneno(){
    if(this.user.primaryPhoneNo!=null&&this.user.primaryPhoneNo!='')
    this.service.checkphoneno(this.user.primaryPhoneNo).subscribe((response)=>this.phonenocheck=response);
    else {this.user.primaryPhoneNo="";this.phonenocheck="";}
  }

  signUpClick() {
    window.location.reload();
  }

  constructor(private service: BasicServicesService,private snkbar:MatSnackBar,private router:Router) {}

  ngOnInit(): void {
  }

}
