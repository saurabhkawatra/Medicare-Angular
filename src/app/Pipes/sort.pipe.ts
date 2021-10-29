import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(itemList: any[],sortonCriteria:any,order:any): any {
    console.log('Entering Sort Pipe....itemList=',itemList,'sortonCriteria=',sortonCriteria,'order=',order);
    console.log('SortonCriterea....',sortonCriteria);
     itemList.sort((a:any,b:any)=>{
      if(order=='asc'){
              if(a[sortonCriteria]>b[sortonCriteria])
                return 1;
              else if(a[sortonCriteria]<b[sortonCriteria])
                return -1;
              else
                return 0;
      }
      else {
              if(a[sortonCriteria]>b[sortonCriteria])
                  return -1;
              else if(a[sortonCriteria]<b[sortonCriteria])
                  return 1;
              else
                  return 0;
      }
    });
    return itemList;
  }

}
