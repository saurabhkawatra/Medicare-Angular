import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtmlPipe'
})
export class SafeHtmlPipePipe implements PipeTransform {

  constructor(private domSanitizer:DomSanitizer) {}
  transform(value){
        return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}
