import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distnctParaFilter',
  pure: false
})
export class DistnctParaFilterPipe implements PipeTransform {

  transform(itemList:any[],para:string): any {
      
    if(itemList!=null && itemList.length > 1) {
                let result=itemList.filter((item)=>{
                  let check=itemList.indexOf(item);
                  for(let i=0;i<itemList.indexOf(item);i++) {
                      if(itemList[i][para]!=item[para]) check--;
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
