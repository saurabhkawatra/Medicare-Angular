import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinctFilter',
  pure: false
})
export class DistinctFilterPipe implements PipeTransform {

  transform(itemList:any[]): any {

    if(itemList!=null && itemList.length > 1) {
                          let result=itemList.filter((item,index)=>{
                            let check=index;
                          for(let i=0;i<index;i++) {
                            if(itemList[i].itemCategory!=item.itemCategory) check--;
                          }
                          if(check==0) return true;
                          else return false;
                        });
                  return result;
    } else {
      return itemList;
    }
  }

}
