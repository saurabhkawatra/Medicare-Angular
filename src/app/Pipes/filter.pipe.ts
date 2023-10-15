import { Pipe, PipeTransform } from '@angular/core';
import { resourceUsage } from 'process';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(itemList:any[],itemCategory:string[]): any {
    if( itemCategory==null || itemCategory.length === 0 || (itemCategory.length === 1 && itemCategory[0]=='') )
        return itemList;
    else {
        let result=itemList.filter((item)=>{
          if(itemCategory.length ==1 && item.itemCategory==itemCategory[0]) {
            return true;
          } else if(itemCategory.length > 1) {

            let check = false;
            for(let ic of itemCategory) {
              if(item.itemCategory == ic)
                check = true;
            }
            return check;
          } else {
            return false;
          }
        });
        return result;
    }
  }

}
