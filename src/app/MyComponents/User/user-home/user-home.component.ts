import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { LoaderComponent } from '../loader/loader.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  giveSomeInput='';
  count=0;
  itemList:any;
  filterCriterea='';
  fwCompany='';
  dashboardToggle=true;

  constructor(private userService:UserServiceService) { }

  //toggleDashboard() {this.dashboardToggle=false; setTimeout(()=>{this.dashboardToggle=true;},250);}
  toggleDashboard(itemInThisEvent) {console.log('toggledashboard() method TRIGERRED, event = ',itemInThisEvent);this.count++; setTimeout(()=>{this.giveSomeInput="sakjldskd"+this.count;},100);}

  ngOnInit(): void {
    this.userService.getAllItems().subscribe(data=>{this.itemList=data;},error=>{console.log('error from user home component',error);});

  }

}
