import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCompany',
  pure: false
})
export class FilterByCompanyPipe implements PipeTransform {

  transform(itemList:any[],companyName): any {
    console.log('PIPE TESTING ------->Comapany Name->',companyName);
    if(Array.isArray(companyName)) {
      if(companyName.length === 0 || companyName[0] === '') {
        return itemList;
      } else {
        let resultList = itemList.filter((item) => {
          if(companyName.some((compName) => item.itemCompany === compName)) {
            return true;
          } else {
            return false;
          }
        });
        return resultList;
      }
    } else {
      if(companyName!=null&&companyName!='') {
        let resultList=itemList.filter((item)=>{
          if(item.itemCompany==companyName)
          return true;
          else
          return false;
        });
        console.log('PIPE TESTING ------->IF CONDITION Result list',resultList);
        return resultList;
      } else {
        console.log('PIPE TESTING ------->ELSE CONDITION list',itemList);
        return itemList;
      }
    }



  }

}
