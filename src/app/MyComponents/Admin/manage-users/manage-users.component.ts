import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  UserList:any[]=[];
  displayList:any[]=[];
  purchaseHistoryListAndUserIdMap:Map<number,any[]> = new Map();
  searchValueBound;
  searchValue;
  pageNo = 1;
  noOfResults = 5;
  noOfResultsSizeOptions = [3,5,10,15,20,25,30,50];
  @ViewChild('tableBody' , {static:true}) tableBody:ElementRef;

  getNoOfPurchasesMade(userId) {
    if(this.purchaseHistoryListAndUserIdMap.get(userId) != null)
    return this.purchaseHistoryListAndUserIdMap.get(userId).length;
    return 0;
  }
  getCurrentSearchBoxValue() {
    return this.searchValue;
  }

  getTotalAmountOfPurchasesMadeForUser(userId) {
    if(this.purchaseHistoryListAndUserIdMap.get(userId) == null)
    return 0;
    let total = 0;
    this.purchaseHistoryListAndUserIdMap.get(userId).forEach(singlePurchaseHistory => {
      singlePurchaseHistory.itemList.forEach(item => {
        total = total + item.unitPrice;        
      });
    });
    return total;
  }

  searchUser(searchKey, event:KeyboardEvent) {
    if(event == null) {
      this.sanitizeDisplayList();
      this.searchValue = searchKey;
      this.pageNo = 1;
      if(searchKey == '') {
        this.displayList = this.UserList.filter(user => user);
      } else {
        this.displayList = this.UserList.filter((user) => {
          if(user.username.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.firstName.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.lastName.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.primaryEmail.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.primaryPhoneNo.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.dateOfBirth.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else
          return false;
        });
        this.highlightTheSearchKey(searchKey);
      }
    } else if(event.key == 'Enter') {
      this.sanitizeDisplayList();
      this.searchValue = searchKey;
      this.pageNo = 1;
      if(searchKey == '') {
        this.displayList = this.UserList.filter(user => user);
      } else {
        this.displayList = this.UserList.filter((user) => {
          if(user.username.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.firstName.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.lastName.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.primaryEmail.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.primaryPhoneNo.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else if(user.dateOfBirth.toLowerCase().match('.*'+searchKey.toLowerCase()+'.*'))
          return true;
          else
          return false;
        });
        this.highlightTheSearchKey(searchKey);
      }
    }
    
  }

  highlightTheSearchKey(searchKey) {
    // console.log('TESTING.......................',this.tableBody)
    // for(let i=0;i<this.tableBody.nativeElement.children.length;i++) {
    //   if(i != this.tableBody.nativeElement.children.length - 1) {
    //     for(let j=0;j<this.tableBody.nativeElement.children[i].children.length;j++) {
    //       this.renderer.setProperty(this.tableBody.nativeElement.children[i].children[j],'innerHTML',this.tableBody.nativeElement.children[i].children[j].innerHTML.replace(searchKey,'<span  style="background-color: yellow;">'+searchKey+'</span>'));
    //       // this.tableBody.nativeElement.children[i].children[j].innerHTML = this.tableBody.nativeElement.children[i].children[j].innerHTML.replace(searchKey,'<span  style="background-color: yellow;">'+searchKey+'</span>');
    //       console.log(this.tableBody.nativeElement.children[i].children[j]);
    //     };
    //   }
    // }
    if(this.displayList.length != 0) {
      for(let user of this.displayList) {
        for(let key in user) {
          if(key == 'username' || key == 'firstName' || key == 'lastName' || key == 'primaryEmail' || key == 'primaryPhoneNo') {
            let resultSet = user[key].match(new RegExp(searchKey,"ig"));
            let lastPosition=0; let newPosition;
            if(resultSet != null)
            for(let i=0;i<resultSet.length;i++) {
              newPosition = user[key].indexOf(resultSet[i],lastPosition);
              user[key] = user[key].substring(0,newPosition) + '<span style="background-color: yellow;">' + user[key].substring(newPosition,newPosition+resultSet[i].length) + '</span>' + user[key].substring(newPosition+resultSet[i].length,user[key].length);
              // user[key] = user[key].replace(resultSet[i],'<span style="background-color: yellow;">'+resultSet[i]+'</span>');
              lastPosition = newPosition + 40 + resultSet[i].length + 7;
            }
          }   
        }
      }
    }

  }

  sanitizeDisplayList() {
      if(this.displayList?.length != 0)
      for(let user of this.displayList) {
        for(let key in user) {
          if(key == 'username' || key == 'firstName' || key == 'lastName' || key == 'primaryEmail' || key == 'primaryPhoneNo') {
            if(user[key].match('</span>') != null) {
              let matchArray = user[key].match(new RegExp('</span>','g'));
              for(let i=0;i<matchArray.length;i++) {
                user[key] = user[key].replace('<span style="background-color: yellow;">','');
                user[key] = user[key].replace('</span>','');
              }
            }
          }
        } 
      }
  }

  getNavButtonStyle(pgNo) {
    if(pgNo == this.pageNo)
      return "border: 2px solid indigo;padding: 4px;background-color: indigo;color: white;";
    else
      return "border: 2px solid indigo;padding: 4px;cursor: pointer;";
  }

  pageNoClick(pgNo) {
    if(pgNo != this.pageNo)
      this.pageNo = pgNo;
  }

  constructor(private adminService:AdminServiceService, private renderer:Renderer2) { }

  ngOnInit(): void {
    this.adminService.getallusers().subscribe(data => {
      this.UserList=data;
      this.UserList.forEach(user => {this.displayList.push(Object.assign({},user));});
      this.UserList.forEach(user => {
        this.adminService.getPurchaseHistoryListForUser(user.userId).subscribe(userPurchaseList => {
          this.purchaseHistoryListAndUserIdMap.set(user.userId,userPurchaseList);
        },error => {
          console.log('Error Could Not Fetch Purchase History List for user id - ',user.userId,'Error in method getNoOfPurchasesMade');
        });
      });
    },error=>{console.log('error from manageusers comp onINit',error);
  });
    
  }

}
