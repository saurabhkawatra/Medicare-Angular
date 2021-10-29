import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distinctFilter'
})
export class DistinctFilterPipe implements PipeTransform {

  transform(itemList:any[]): any {
    let result=itemList.filter((item)=>{
                                let check=itemList.indexOf(item);
                              for(let i=0;i<itemList.indexOf(item);i++) {
                                if(itemList[i].itemCategory!=item.itemCategory) check--;
                              }
                              if(check==0) return true;
                              else return false;
                            });
    return result;
  }

}
