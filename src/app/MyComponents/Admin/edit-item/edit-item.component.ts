import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  receivedItemId;
  receivedItem;
  uploadItem;

  itemName:string;unitPrice:number;itemCompany:string;itemCategory:string;itemQuantity;
  itemCategoryList;
  imageFile:File;
  imgsrc;
  categoryName;

  constructor(private activatedRoute:ActivatedRoute,private adminService:AdminServiceService,private router:Router) { 
    
  }

  updateItemClick() {
    console.log('Update Item click');
    let obj={"itemId":this.uploadItem.itemId,"itemName":this.uploadItem.itemName,"unitPrice":this.uploadItem.unitPrice,"itemCompany":this.uploadItem.itemCompany,"itemCategory":this.uploadItem.itemCategory,"itemQuantity":this.uploadItem.itemQuantity}
    console.log('Update Item Click obj=',obj);
    this.adminService.updateItem(obj,this.imageFile).subscribe(
      data=>{console.log(data['message']);this.router.navigateByUrl('/admin/manageProducts');},
      error=>{console.log('error from updateItemClick()',error);}
      );
  }

  imageChange(event) {
    console.log(event);
    console.log('File - ',event.target.files[0]);
    this.imageFile=event.target.files[0];
    let fileReader= new FileReader();
    fileReader.onload=()=>{this.imgsrc=fileReader.result;}
    fileReader.readAsDataURL(this.imageFile);
}

  ngOnInit(): void {
    //document.scrollingElement.scrollTo({top:0});
    window.scrollTo(0,0);
    this.receivedItemId=this.activatedRoute.snapshot.params['itemId'];
    this.adminService.getitembyId(this.activatedRoute.snapshot.params['itemId']).subscribe(
      data=>{
        this.receivedItem=data;
        this.imgsrc=this.receivedItem.itemImageUrl;
        this.uploadItem=this.receivedItem; 
      },
      
      error=>{console.log('error from edit item comp',error);});

      this.adminService.getAllCategories().subscribe(data=>{this.itemCategoryList=data;},error=>{console.log('error from edit item comp',error);});
    
  }

}
