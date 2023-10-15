import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';

@Component({
  selector: 'myindex',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewChecked {

  testImageUrlItem1:String = "https://raw.githubusercontent.com/saurabhkawatra/staticfilesforangular/main/item1.jpg";

  constructor(private loaderService: LoaderServiceService) {
  }
  ngAfterViewChecked(): void {
    this.loaderService.setShowLoader(false);
  }

  ngOnInit(): void {
  }

}
