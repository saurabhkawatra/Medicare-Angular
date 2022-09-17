import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BasicServicesService } from 'src/app/Services/basic-services.service';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';
import { User } from '../MODELS/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reg_btn_disable: String = "false";
  isRegistrationSuccess: Boolean = false;
  isDisplayVerifyOtp: boolean = false;
  message: any;
  emailcheck: any;
  usernamecheck: any;
  phonenocheck: any;
  user: User = new User();
  hzp: MatSnackBarHorizontalPosition;
  vtclp: MatSnackBarVerticalPosition;
  otp: string;
  timer: Date;
  minutesLeft;
  secondsLeft;


  incorrectvaluescheck() {
    if (this.user.firstName == null) { this.user.firstName = ""; }
    if (this.user.lastName == null) { this.user.lastName = ""; }
    if (this.user.password == null) { this.user.password = ""; }
  }

  registerclick() {
    this.loaderService.showLoaderForSomeTime(4000);
    console.log('registerclick() executed');
    this.keyupemail();
    this.keyupusername();
    this.keyupphoneno();

    if (this.emailcheck == 'EmailAvailable' && this.usernamecheck == 'UsernameAvailable' && this.phonenocheck == 'PhonenoAvailable' && this.user.dateOfBirth && this.user.dateOfBirth != null && this.user.firstName != null && this.user.firstName != "" && this.user.lastName != null && this.user.lastName != "" && this.user.password != null && this.user.password != "") {
      this.isDisplayVerifyOtp = true;
      this.otp = '';
      this.service.sendRegistrationOtp(this.user).subscribe((response) => {
        let convertedResponse = JSON.parse(response.toString());
        if (convertedResponse.message != 'OTP sent') {
          this.isDisplayVerifyOtp = false;
          this.snkbar.open(convertedResponse.message, "OK", { horizontalPosition: this.hzp = 'center', verticalPosition: this.vtclp = 'bottom', duration: 10000 });
        }
        if (convertedResponse.message == 'OTP sent') {
          this.timer = new Date();
          this.timer.setTime(0);
          this.timer.setMinutes((convertedResponse.expirationTime / 1000) / 60);
          this.timer.setSeconds((convertedResponse.expirationTime / 1000) % 60);
          let interval = setInterval(() => {
            if (this.timer.getMinutes() < 1) {
              if (this.timer.getSeconds() < 1) {
                clearInterval(interval);
                this.isDisplayVerifyOtp = false;
                this.snkbar.open('OTP Expired!! Please Try Again !!', "OK", { horizontalPosition: this.hzp = 'center', verticalPosition: this.vtclp = 'bottom', duration: 10000 });
              }
            }
            this.minutesLeft = this.timer.getMinutes();
            this.secondsLeft = this.timer.getSeconds();
            this.timer.setTime(this.timer.getTime() - 500);
          }, 500);
        }
      });
    }
    else {
      this.incorrectvaluescheck();
      this.snkbar.open("Invalid Form Details!", "OK", { horizontalPosition: 'center', verticalPosition: 'top', duration: 4000 });
    }
  }
  onOtpSubmit() {
    this.service.doRegistration(this.user, this.otp).subscribe((response) => {
      this.message = response;
      if (response == "Registration Success") {
        this.isRegistrationSuccess = true;
        console.log(this.message);
        this.snkbar.open(this.message, "OK", { horizontalPosition: this.hzp = 'center', verticalPosition: this.vtclp = 'bottom', duration: 4000 });
      } else {
        this.user.dateOfBirth = null; this.user.firstName = ''; this.user.lastName = ''; this.user.password = ''; this.user.primaryEmail = ''; this.user.primaryPhoneNo = ''; this.user.username = '';
        this.isDisplayVerifyOtp = false;
        this.snkbar.open(this.message, "OK", { horizontalPosition: this.hzp = 'center', verticalPosition: this.vtclp = 'bottom', duration: 4000 });
      }
    });
  }
  keyupemail() {
    if (this.user.primaryEmail != null && this.user.primaryEmail != '' && this.user.primaryEmail != undefined) {
      this.service.checkemail(this.user.primaryEmail).subscribe((response) => {
        this.emailcheck = response;
        console.log(this.emailcheck);
        if (this.emailcheck == "EmailDuplicate") { }
        else { }
      });
    } else { this.user.primaryEmail = ""; this.emailcheck = ""; }

  }
  keyupusername() {
    if (this.user.username != null && this.user.username != '')
      this.service.checkusername(this.user.username).subscribe((response) => this.usernamecheck = response);
    else { this.user.username = ""; this.usernamecheck = ""; }
  }
  keyupphoneno() {
    if (this.user.primaryPhoneNo != null && this.user.primaryPhoneNo != '')
      this.service.checkphoneno(this.user.primaryPhoneNo).subscribe((response) => this.phonenocheck = response);
    else { this.user.primaryPhoneNo = ""; this.phonenocheck = ""; }
  }

  signUpClick() {
    window.location.reload();
  }

  constructor(private service: BasicServicesService, private snkbar: MatSnackBar, private router: Router, private loaderService: LoaderServiceService) { }

  ngOnInit(): void {
  }

}
