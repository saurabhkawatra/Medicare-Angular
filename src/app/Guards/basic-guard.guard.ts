import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicServicesService } from '../Services/basic-services.service';

@Injectable({
  providedIn: 'root'
})
export class BasicGuardGuard implements CanActivate {


  constructor(private service:BasicServicesService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.service.checkauthority().subscribe(data => {
        console.log('testing...data["message"]',data["message"],'testing.....data',data);
        if(data["message"]=='admin') {
          this.router.navigate(['/admin/home']);
          return false;
        } else if(data["message"]=='user') {
          this.router.navigate(['/user/home']);
            return false;
        } else {
            return true;
        }
      },
      error =>{this.router.navigate(['/']);console.log(error);return true;
      });
      return true;
  }
  
}
