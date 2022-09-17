import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.css']
})
export class PopUpDialogComponent implements OnInit {

  @ViewChild('popUpDialogBox')
  popUpDialogBox: ElementRef;
  @Input('isPopUpVisible')
  isPopUpDialogBoxVisible: boolean;
  @Input('message')
  message;
  @Output('onCloseButtonClick')
  onCloseButtonClick = new EventEmitter<any>();

  constructor(private renderer: Renderer2) { }

  onCloseClick() {
    this.onCloseButtonClick.emit();
  }

  ngOnInit() {
    // this.renderer.listen('window', 'click', (e: Event) => {
    //   if(this.popUpDialogBox)
    //   if(!this.popUpDialogBox.nativeElement.contains(e.target)) {
    //     this.onCloseButtonClick.emit();
    //   }
    // });
  }

}
