import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  // baseURL:string="http://54.157.10.242:8084"+"/admin";
  baseURL:string="http://localhost:8084"+"/admin";

  params:HttpParams;

  constructor(private http:HttpClient) { }

  getActivatedItems() {
    return this.http.post(this.baseURL+'/getAllActivatedItems',null);
  }

  getAllItems():Observable<any[]> {
    return this.http.post<any[]>(this.baseURL+'/getAllItems',null);
  }

  getuserdetails(){
        return this.http.post(this.baseURL+'/getUserDetails',null);
  }

  activateDeactivateItem(itemId:number) {
      return this.http.post(this.baseURL+'/activateDeactivateItem',itemId);
  }

  getAllCategories() {
    return this.http.post(this.baseURL+'/getAllCategories',null);
  }

  addNewItem(item,imageFileArray:File[]) {
        let formData= new FormData();
        if(imageFileArray!=null)
        {
          for(let image of imageFileArray) {
            formData.append('imageFiles',image,image.name);
            formData.append('itemImageName',image.name);
          }
        }
        formData.append('itemName',item.itemName);
        formData.append('itemCompany',item.itemCompany);
        formData.append('itemCategory',item.itemCategory);
        formData.append('unitPrice',item.unitPrice);
        formData.append('itemQuantity',item.itemQuantity);

        return this.http.post(this.baseURL+'/addNewItem',formData);
  }

  addNewCategory(categoryName) {
    return this.http.post(this.baseURL+'/addNewCategory',categoryName);
  }

  getitembyId(itemId) {
    return this.http.post(this.baseURL+'/getitembyId/'+itemId,null);
  }

  updateItem(item,imageFileArray:File[]) {

    let formData= new FormData();
        if(imageFileArray!=null)
        {
          for(let image of imageFileArray) {
            formData.append('imageFiles',image,image.name);
            formData.append('itemImageName',image.name);
          }
        }
        formData.append('itemId',item.itemId);
        formData.append('itemName',item.itemName);
        formData.append('itemCompany',item.itemCompany);
        formData.append('itemCategory',item.itemCategory);
        formData.append('unitPrice',item.unitPrice);
        formData.append('itemQuantity',item.itemQuantity);

        return this.http.post(this.baseURL+'/updateItem',formData);

  }

  getallusers(){
    return this.http.post<any[]>(this.baseURL+'/getallusers',null);
  }

  getPurchaseHistoryListForUser(userId) {
    return this.http.post<any[]>(this.baseURL+'/getPurchaseHistoryListForUser/'+userId,null);
  }
}
