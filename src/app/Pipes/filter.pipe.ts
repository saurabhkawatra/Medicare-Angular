import { Pipe, PipeTransform } from '@angular/core';
import { resourceUsage } from 'process';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(itemList:any[],itemCategory:string): any {
    if(itemCategory==null||itemCategory=='')
        return itemList;
    else {
        let result=itemList.filter((item)=>{if(item.itemCategory==itemCategory) return true; else return false;});
        return result;
    } 
  }

}
