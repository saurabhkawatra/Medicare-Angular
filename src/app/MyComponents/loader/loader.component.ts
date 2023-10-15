import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input('isVisible') isVisible:boolean;

  constructor() { }

  ngOnInit(): void {
    console.log('TESTING COMPONENT LOADER INIT...................');
  }

}
