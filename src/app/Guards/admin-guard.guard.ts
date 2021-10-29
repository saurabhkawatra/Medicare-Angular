import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicServicesService } from '../Services/basic-services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private service:BasicServicesService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.service.checkauthority().subscribe(data => {
        console.log('testing...data["message"]',data["message"],'testing.....data',data);
        if(data["message"]=='admin') {
         
        } else if(data["message"]=='user') {
          this.router.navigateByUrl('/user/home');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error =>{this.router.navigateByUrl('/');console.log('error from guard',error);
      });

    return true;
  }
  
}
