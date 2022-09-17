import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LoaderServiceService } from './Services/CommonServices/loader-service.service';
import { PopUpService } from './Services/CommonServices/pop-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Medicare-Angular';
  isLoaderVisible;
  isPopUpVisible;
  popUpMessage;
  popUpTimeout;

  constructor(private loaderService:LoaderServiceService, private popUpService: PopUpService) {}

  onCloseButtonClick() {
    this.popUpService.hidePopUpBox();
  }

  ngOnInit(): void {
      this.loaderService.loaderObservable$.subscribe( incommingData => {
        this.isLoaderVisible = incommingData;
      });

      this.popUpService.showPopUp$.subscribe(incommingData => {
        this.isPopUpVisible = incommingData.isPopUpVisible;
        this.popUpMessage = incommingData.message;
        this.popUpTimeout = incommingData.timeOut;
      });

  }


}
