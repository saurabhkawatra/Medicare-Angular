import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // baseURL:string='http://54.157.10.242:8084'+'/user';
  baseURL:string='http://localhost:8084'+'/user';

  constructor(private http:HttpClient) { }

  getUserDetails() {
    return this.http.post(this.baseURL+'/getUserDetails',null);
  }

  getAllItems() {
    return this.http.post(this.baseURL+'/getAllItems',null);
  }

  addItemToCart(item) {
    return this.http.post(this.baseURL+'/addItemToCart',item);
  }

  removeItemFromCart(item) {
    return this.http.post(this.baseURL+'/removeItemFromCart',item);
  }

  getItemsInCart() {
    return this.http.post<any[]>(this.baseURL+'/getItemsInCart',null);
  }

  paymentmade(paymentDetailsObject) {
    return this.http.post(this.baseURL+'/paymentMade',paymentDetailsObject);
  }

  getLatestPurchaseDetails() {
    return this.http.post(this.baseURL+'/getLatestPurchaseDetails',null);
  }

  getListOfPurchases() {
    return this.http.post(this.baseURL+'/getListOfPurchases',null);
  }
}
