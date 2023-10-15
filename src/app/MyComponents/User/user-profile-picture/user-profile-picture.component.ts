import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopUpService } from 'src/app/Services/CommonServices/pop-up.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.css']
})
export class UserProfilePictureComponent implements OnInit {

  currentProfileImage;
  inputImage;
  inputImageFile: File;
  height = 450;
  user:any;
  dashboardRandomInput = 'a';

  constructor(private userService:UserServiceService, private popUp: PopUpService) { }

  onImageChange(event) {
    console.log(event);
    console.log(this.inputImage);
    this.inputImageFile = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(event.target.files[0]);
    fr.onloadend = ()=>{
        this.inputImage = fr.result;
    }
  }

  onUpdateProfilePhotoClick() {
    console.log(this.inputImageFile);
    this.userService.updateProfilePhoto(this.inputImageFile)
    .subscribe(response => {
      this.popUp.showPopUpBox(response.message, 3000);
      this.dashboardRandomInput = Math.random()*1000 + '';
      this.inputImage = null;
      this.inputImageFile = null;
      this.ngOnInit();
    },error => {
      console.log('Error from user profile component', error);
    });
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(userData => {
      this.user=userData;
      this.currentProfileImage = this.user.profilePicture;
    }, error => console.log('Error userProfile Component',error));
  }

}
