import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distnctParaFilter'
})
export class DistnctParaFilterPipe implements PipeTransform {

  transform(itemList:any[],para:string): any {
    let result=itemList.filter((item)=>{
            let check=itemList.indexOf(item);
            for(let i=0;i<itemList.indexOf(item);i++) {
                if(itemList[i][para]!=item[para]) check--;
                }
            if(check==0) return true;
            else return false;
                  });
    return result;
  }

}
