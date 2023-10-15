import { Component, ComponentRef, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { LoaderServiceService } from 'src/app/Services/CommonServices/loader-service.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { DistinctFilterPipe } from 'src/app/Pipes/distinct-filter.pipe';
import { SortPipe } from 'src/app/Pipes/sort.pipe';
import { DistnctParaFilterPipe } from 'src/app/Pipes/distnct-para-filter.pipe';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, AfterViewInit, OnChanges {

  giveSomeInput='';
  count=0;
  itemList:any;
  filterCritereaSingleSelect='';
  filterMultiSelectCheckbox=[];
  fwCompany='';
  filterMultiSelectCompanyCheckbox = [];
  dashboardToggle=true;
  dashBoardHeight = 270;
  sortCriterea='None';
  sortOrder= 'asc';
  @ViewChild('userDashboard')
  dashboard: UserDashboardComponent;
  @ViewChild('userDashboard',{read: ElementRef})
  userDashboard: ElementRef;

  @ViewChildren('categoryCheckbox') categoryCheckbox: QueryList<MatCheckbox>;
  @ViewChild('categorySelectAll') categorySelectAll: MatCheckbox;

  @ViewChildren('companyCheckbox') companyCheckbox: QueryList<MatCheckbox>;
  @ViewChild('companySelectAll') companySelectAll: MatCheckbox;


  constructor(private userService:UserServiceService, private loaderService: LoaderServiceService,
    private renderer:Renderer2, private sortPipe: SortPipe, private distinctFilter: DistinctFilterPipe,
    private distinctParaFilterPipe: DistnctParaFilterPipe ) { }


  //toggleDashboard() {this.dashboardToggle=false; setTimeout(()=>{this.dashboardToggle=true;},250);}
  toggleDashboard(itemInThisEvent) {console.log('toggledashboard() method TRIGERRED, event = ',itemInThisEvent);this.count++; setTimeout(()=>{this.giveSomeInput="sakjldskd"+this.count;},100);}

  setDashboardHeight() {
    this.dashBoardHeight = this.userDashboard.nativeElement.offsetHeight;
  }
  ngOnInit(): void {
    this.loaderService.setShowLoader(true);
    this.userService.getAllItems().subscribe(data=>{this.itemList=data;this.loaderService.setShowLoader(false);},error=>{console.log('error from user home component',error);});
    this.renderer.listen('window','resize',()=>{this.setDashboardHeight();})
  }

  ngAfterViewInit(): void {
    this.setDashboardHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDashboardHeight();
  }


  onCategoryCheckBoxChange(category, event) {
    if(event.checked) {
      this.filterMultiSelectCheckbox.push(category);
      this.filterMultiSelectCheckbox = this.filterMultiSelectCheckbox.filter(cate => cate === cate);
    } else {
      this.filterMultiSelectCheckbox = this.filterMultiSelectCheckbox.filter(cate => cate !== category);
    }

    if(this.filterMultiSelectCheckbox.length === this.sortPipe.transform(this.distinctFilter.transform(this.itemList),'itemCategory', 'asc').length) {
      this.categorySelectAll.checked = true;
    } else {
      this.categorySelectAll.checked = false;
    }


  }

  onCategorySelectAllClick(isCheked) {
    if(isCheked) {
      this.categoryCheckbox.forEach((categoryCheckbox) => {
        if(!categoryCheckbox.checked) {
          categoryCheckbox.toggle();
        }
      });
      this.filterMultiSelectCheckbox = [];
      this.sortPipe.transform(this.distinctFilter.transform(this.itemList),'itemCategory', 'asc')?.forEach((item)=>{
        this.filterMultiSelectCheckbox.push(item.itemCategory);
      }) ;
    } else {
      this.categoryCheckbox.forEach((categoryCheckbox) => {
        if(categoryCheckbox.checked) {
          categoryCheckbox.toggle();
        }
      });
      this.filterMultiSelectCheckbox = [];
    }
  }

  onCompanyCheckBoxChange(company, event) {
    if(event.checked) {
      this.filterMultiSelectCompanyCheckbox.push(company);
      this.filterMultiSelectCompanyCheckbox = this.filterMultiSelectCompanyCheckbox.filter(comp => comp === comp);
    } else {
      this.filterMultiSelectCompanyCheckbox = this.filterMultiSelectCompanyCheckbox.filter(comp => comp !== company);
    }

    if(this.filterMultiSelectCompanyCheckbox.length === this.sortPipe.transform(this.distinctFilter.transform(this.itemList),'itemCategory', 'asc').length) {
      this.companySelectAll.checked = true;
    } else {
      this.companySelectAll.checked = false;
    }


  }

  onCompanySelectAllClick(isCheked) {
    if(isCheked) {
      this.companyCheckbox.forEach((companyCheckbox) => {
        if(!companyCheckbox.checked) {
          companyCheckbox.toggle();
        }
      });
      this.filterMultiSelectCompanyCheckbox = [];
      this.sortPipe.transform(this.distinctParaFilterPipe.transform(this.itemList,'itemCompany'),'itemCompany', 'asc')?.forEach((item)=>{
        this.filterMultiSelectCompanyCheckbox.push(item.itemCompany);
      }) ;
    } else {
      this.companyCheckbox.forEach((companyCheckbox) => {
        if(companyCheckbox.checked) {
          companyCheckbox.toggle();
        }
      });
      this.filterMultiSelectCompanyCheckbox = [];
    }
  }

}
