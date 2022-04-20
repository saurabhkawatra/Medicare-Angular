import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  constructor() { }

  private _isLoaderVisible = new Subject<boolean>();
  loaderObservable$ = this._isLoaderVisible.asObservable();
  loaderStateVisible = false;

  setShowLoader(state:boolean) {
    this.loaderStateVisible = state;
    this._isLoaderVisible.next(state);
  }
  showLoaderForSomeTime(showLoaderForTime:number) {
    this._isLoaderVisible.next(true);
    this.loaderStateVisible = true;
    setTimeout(()=>{
      this.loaderStateVisible = false;
      this._isLoaderVisible.next(false);
    },showLoaderForTime);
  }
  hideLoaderAfterSomeTime(hideAfterTime:number) {
    setTimeout(()=>{
      this.loaderStateVisible = false;
      this._isLoaderVisible.next(false);
    },hideAfterTime);
  }
  getLoaderState():boolean {
    return this.loaderStateVisible;
  }
}
