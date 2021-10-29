import { Component, OnInit } from '@angular/core';
import { BasicServicesService } from 'src/app/Services/basic-services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  noLogin=false;
  isAdmin=false;
  isUser=false;

  constructor(private basicService:BasicServicesService) { }

  ngOnInit(): void {
    this.basicService.checkauthority().subscribe(data=>{
      if(data['message']=='admin') {this.isAdmin=true;this.noLogin=false;this.isUser=false;}
      else if(data['message']=='user') {this.isAdmin=false;this.noLogin=false;this.isUser=true;}
      else {this.isAdmin=false;this.noLogin=true;this.isUser=false;}
    },error=>{console.log('error from About comp');});
  }

}
