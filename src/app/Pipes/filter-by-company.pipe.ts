import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCompany'
})
export class FilterByCompanyPipe implements PipeTransform {

  transform(itemList:any[],companyName): any[] {
    if(companyName==null||companyName=='') {
      return itemList;
    } else {
      let resultList=itemList.filter((item)=>{
        if(item.itemCompany==companyName)
        return true;
        else
        return false;
      });
      return resultList;
    }
  }

}
