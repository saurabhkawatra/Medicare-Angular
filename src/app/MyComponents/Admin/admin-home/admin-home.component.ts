import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/AdminService/admin-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  panelOpenState=false;
  itemName:string;unitPrice:number;itemCompany:string;itemCategory:string;itemQuantity;
  itemCategoryList;
  imageFiles:File[];
  imgsrc=[];
  categoryName;
  @ViewChild('addItemForm') addItemForm:NgForm;
  @ViewChild('imgFileInputElement') imgFileInputElement:ElementRef;
  @ViewChild('addCategoryForm') addCategoryForm:NgForm;
  @ViewChild('togglebtn') modaltogglebtn:ElementRef;
  vrtp:MatSnackBarVerticalPosition;
  hzp:MatSnackBarHorizontalPosition;

constructor(private adminService:AdminServiceService,private router:Router,private snkbar:MatSnackBar) { }

addCategoryClick() {
    this.modaltogglebtn.nativeElement.click();
    console.log('Add new Category Click categoryName=',this.categoryName);
    this.adminService.addNewCategory(this.categoryName).subscribe((data)=>{
      this.addCategoryForm.resetForm();
      window.setTimeout(()=>{
        this.modaltogglebtn.nativeElement.click();
        this.snkbar.open(data['message'],'OK',{verticalPosition:'bottom',horizontalPosition:'center',duration:4000});
        this.ngOnInit();
      },2000);
    },error=>{this.modaltogglebtn.nativeElement.click();console.log('error from addCategory() admin-home-comp',error);});
}

addItemClick() {
  console.log('Add Item click');
  let obj={"itemName":this.itemName,"unitPrice":this.unitPrice,"itemCompany":this.itemCompany,"itemCategory":this.itemCategory,"itemQuantity":this.itemQuantity}
  this.modaltogglebtn.nativeElement.click();
  console.log('Add new Item Click obj=',obj);
  this.adminService.addNewItem(obj,this.imageFiles).subscribe(
    data=>{
            console.log(data['message']);
            this.addItemForm.resetForm();
            this.imgFileInputElement.nativeElement.value='';
            this.imageFiles=null;
            this.imgsrc=[];
            window.setTimeout(()=>{
              this.modaltogglebtn.nativeElement.click();
              this.snkbar.open(data['message'],'OK',{horizontalPosition:'center',verticalPosition:'bottom',duration:4000});
            },2000);
        },
    error=>{this.modaltogglebtn.nativeElement.click();console.log('error from addItemClick()',error);}
    );
}
imageChange(event) {
    console.log(event);
    console.log('File - ',event.target.files[0]);
    this.imageFiles=event.target.files;
    this.imgsrc=[];
    let count=0;
    for(let img of this.imageFiles) {
      let fileReader= new FileReader();
      fileReader.onload=()=>{this.imgsrc.push(fileReader.result);}
      fileReader.readAsDataURL(this.imageFiles[count]);
      count++;
    }
}

  ngOnInit(): void {
    this.adminService.getAllCategories().subscribe(data=>{this.itemCategoryList=data;},error=>{console.log('error from ngOnInit',error);});
    console.log(this.itemCategoryList);
  }

}
