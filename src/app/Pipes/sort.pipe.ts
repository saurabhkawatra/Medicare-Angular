import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(itemList: any[],sortonCriteria:any,order:any): any {

    console.log('Entering Sort Pipe....itemList=',itemList,'sortonCriteria=',sortonCriteria,'order=',order);
    console.log('SortonCriterea....',sortonCriteria);
        
    if(itemList!=null) {
                        if(sortonCriteria === 'None') {
                          
                        } else if(sortonCriteria === 'orderValue') {
                          itemList.sort((a,b)=>{
                            let aTotalAmount = 0;
                            let bTotalAmount = 0;
                            a.itemList.forEach(item => {
                              aTotalAmount = aTotalAmount + item.unitPrice;
                            });
                            b.itemList.forEach(item => {
                              bTotalAmount = bTotalAmount + item.unitPrice;
                            });
                            if(aTotalAmount > bTotalAmount) {
                              if(order == 'asc')
                              return 1;
                              return -1;
                            } else if(aTotalAmount == bTotalAmount) {
                              return 0;
                            } else {
                              if(order == 'asc')
                              return -1;
                              return 1;
                            }
                          });
                          return itemList;
                        }
                        
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

}
