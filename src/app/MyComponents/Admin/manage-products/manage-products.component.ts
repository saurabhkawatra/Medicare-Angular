import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
    
  itemList:any=[];
  slideValue;
  filterCriterea='';
  inputSortCriterea='itemId';
  inputSortOrder='asc';
  cfitid='black';
  cfitname='black';
  cfitcompany='black';
  cfitcategory='black';
  cfqa='black';
  cfup='black';
  cfas='black';
  

  @ViewChild('itstbody') itstbody:ElementRef;
  @ViewChild('togglebtn') togglebtn:ElementRef;
  hzp:MatSnackBarHorizontalPosition;
  vrtlp:MatSnackBarVerticalPosition;

  constructor(private router:Router,private adminService:AdminServiceService,private snkbar:MatSnackBar) { }

  statusCheck(status:string) {
      if(status=='active')
          return true;
      else
          return false;
  }

  sortingClick(criterea) {
      if(this.inputSortOrder=='asc')this.inputSortOrder='des'; 
      else this.inputSortOrder='asc';

      this.inputSortCriterea=criterea;
      if(criterea=='itemId') {this.cfitid='blue',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='black';this.cfup='black';this.cfas='black';}
      else if(criterea=='itemName') {this.cfitid='black',this.cfitname='blue', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='black';this.cfup='black';this.cfas='black';}
      else if(criterea=='itemCompany') {this.cfitid='black',this.cfitname='black', this.cfitcompany='blue';this.cfitcategory='black';this.cfqa='black';this.cfup='black';this.cfas='black';}
      else if(criterea=='itemCategory') {this.cfitid='black',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='blue';this.cfqa='black';this.cfup='black';this.cfas='black';}
      else if(criterea=='itemQuantity') {this.cfitid='black',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='blue';this.cfup='black';this.cfas='black';}
      else if(criterea=='unitPrice') {this.cfitid='black',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='black';this.cfup='blue';this.cfas='black';}
      else if(criterea=='itemStatus') {this.cfitid='black',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='black';this.cfup='black';this.cfas='blue';}
      else {this.cfitid='black',this.cfitname='black', this.cfitcompany='black';this.cfitcategory='black';this.cfqa='black';this.cfup='black';this.cfas='black';}
  }

  itemStatusChange(itemId:number,currentItemStatus:string,index:number) {
          this.togglebtn.nativeElement.click();
          console.log('itemId :: ',itemId,'currentItemStatus :: ',currentItemStatus);
          console.log(this.slideValue);
          this.adminService.activateDeactivateItem(itemId).subscribe(data=>{
            console.log(data['message']);
            for(let i of this.itemList) if(i.itemId==itemId) {if(currentItemStatus=='active') {console.log('executing if block itemList[',index,'].itemStatus setting to deactivated');i.itemStatus='deactivated';} else {console.log('executing else block itemList[',index,'].itemStatus setting to active');i.itemStatus='active';}}
            setTimeout(()=>{this.togglebtn.nativeElement.click();
              this.snkbar.open(data['message'],'OK',{verticalPosition:this.vrtlp='bottom',horizontalPosition:this.hzp='center',duration:4000});
                    },2000);
          },error=>{this.togglebtn.nativeElement.click();console.log('error from itemStatusChange',error);});
  }

  testing(index:number) {
        console.log('button pressed by index',index);
        this.router.navigateByUrl('/admin/manageProducts');

  }
  
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.adminService.getAllItems().subscribe(data=>{this.itemList=data;console.log(data);},error=>{console.log('error in AdminHomeComponent service call',error)});
  }

}
