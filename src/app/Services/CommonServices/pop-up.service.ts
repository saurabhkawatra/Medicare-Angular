import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private _showPopUp = new Subject<any>();
  showPopUp$ = this._showPopUp.asObservable();
  obj = {message:'',isPopUpVisible:true,timeOut:''};


  showPopUpBox(message, timeOut?) {
    setTimeout(()=>{
      let timeOutClock = timeOut || null;
      this.nextMethod(message,true,timeOutClock);
    },0);
  }

  hidePopUpBox() {
    this.nextMethod('',false,null);
  }

  private nextMethod(message, isPopUpVisible, timeOut) {
    this.obj.message = message;
    this.obj.isPopUpVisible = isPopUpVisible;
    this.obj.timeOut = timeOut;
    this._showPopUp.next(this.obj);
    if(this.obj.timeOut != null) {
      setTimeout(()=>{
        this.hidePopUpBox();
      }, Number.parseInt(this.obj.timeOut));
    }
  }

  constructor() { }
}
