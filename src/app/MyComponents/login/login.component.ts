import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BasicServicesService } from 'src/app/Services/basic-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data={username:"",password:""};
  responseObject:any;
  message="";
  token="";
  loginFail:string;
  hzp:MatSnackBarHorizontalPosition;
  vtclp:MatSnackBarVerticalPosition;


  constructor(private basicservice:BasicServicesService,private snkbar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  checkforemptyfields() {
      if(this.data.username==""||this.data.password=="")
          return true;
      else
          return false;
  }

  signinclick() {
    console.log('executing signinclick()');
   let bool=this.checkforemptyfields();
    if(!bool)
        //this.basicservice.doLogin(this.data).subscribe(response =>{console.log(response);},error =>{console.log(error);}});
        this.basicservice.doLogin(this.data).subscribe(response => {
          this.responseObject=response;
          this.message=this.responseObject.message;
          this.token=this.responseObject.token;
          this.afterlogin(this.message);
          this.data.username="";
          this.data.password="";
           console.log("response = ",response);
          localStorage.setItem('authToken',this.token);
          });
      else {
        this.snkbar.open("Fields cannot be Empty!!","OK",{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom', duration:4000});
      }
  }
  resetLoginStatus() {
    this.loginFail='false';
  }

  afterlogin(message:string) {

    if(message=="user_login_success") {
      this.router.navigate(['/user/home']);
    } else if (message == "admin_login_success") {
           this.router.navigate(['/admin/home']);
    } else {
        this.loginFail='true';
        this.snkbar.open("Login Failed!!","OK",{horizontalPosition:this.hzp='center',verticalPosition:this.vtclp='bottom', duration:4000});
    }

  }

}
