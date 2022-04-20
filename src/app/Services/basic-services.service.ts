import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../MyComponents/MODELS/user';

@Injectable({
  providedIn: 'root'
})
export class BasicServicesService {

 baseURL:string="http://localhost:8084";
//  baseURL:string="http://54.157.10.242:8084";
 //header = new HttpHeaders({'API_KEY':'blabla'});
  header = new HttpHeaders();
  params= new HttpParams();
  

  constructor(private http:HttpClient) { }

  doLogin(loginInfo) {
    // this.header=this.header.set('API_KEY','fuck this shit');
    // this.params=this.params.set("para1","just checking");
    return this.http.post(this.baseURL+"/login",loginInfo);
  }
  sendRegistrationOtp(reg_user:User) {
    return this.http.post(this.baseURL+'/sendRegistrationOtp',reg_user,{responseType:"text" as "json"});
  }
  doRegistration(registrationInfo:User, otp:string) {
    return this.http.post(this.baseURL+"/register"+"?otp="+otp,registrationInfo,{responseType:"text" as "json"});
  }

  checkusername(username) {
    return this.http.post(this.baseURL+"/checkforusername/"+username,null,{responseType:"text" as "json"});
  }
  checkemail(email) {
    return this.http.post(this.baseURL+"/checkforprimaryemail/"+email,null,{responseType:"text" as "json"});
  }
  checkphoneno(phoneno) {
    return this.http.post(this.baseURL+"/checkforprimaryphoneno/"+phoneno,null,{responseType:"text" as "json"});
  }
  checkauthority(){
    return this.http.post(this.baseURL+'/checkforauthority',null);
  }
  logout() {
    return this.http.post(this.baseURL+"/logout",null);
  }
  
}
