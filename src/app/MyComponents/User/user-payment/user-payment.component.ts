import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {

  cardNo;
  cvv;
  cardExpireDate:Date;
  cardHolderName;
@ViewChild('togglebtn') togglebtn:ElementRef;

  constructor(private router:Router,private userService:UserServiceService) { }


  onPayClick() {
    console.log('cardNo=',this.cardNo);
    console.log('cvv=',this.cvv);
    console.log('cardExpireDate=',this.cardExpireDate);
    console.log('cardHolderName=',this.cardHolderName);
    if(this.cardNo!=null||this.cvv!=null||this.cardExpireDate!=null||this.cardHolderName!=null||this.cardNo!=''||this.cvv!=''||this.cardHolderName!='') 
    {
        let obj={'cardNo':this.cardNo,'cvv':this.cvv,'cardExpireDate':this.cardExpireDate,'cardHolderName':this.cardHolderName};
        console.log('if block');
        console.log(obj);
        this.userService.paymentmade(obj).subscribe(data=>{this.togglebtn.nativeElement.click();console.log('received response -',data['message']); setTimeout(() => {this.togglebtn.nativeElement.click();this.router.navigateByUrl('/user/orderDetails');}, 2000);},error=>{console.log('error from user payment comp onPayClick()',error);});
    } else {
        console.log('Incomplete Details')
    }
  }

  ngOnInit(): void {
  }

}
