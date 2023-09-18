import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit,AfterViewInit {
  isMobile:boolean=false;
  @ViewChild("drawer",{}) drawer: MatDrawer;
  constructor(private cd:ChangeDetectorRef,private dataService:DataService) {
   }

  ngOnInit(): void {
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
    
  }
  ngAfterViewInit(): void {
    if(!this.isMobile){
      this.drawer.close();
    }
    this.cd.detectChanges();
  }
  onResize(event:any) {
    this.isMobile = window.matchMedia("(max-width: 990px)").matches;
    if(!this.isMobile){
      this.drawer?.close();
    }
  }
  toggle(){
    if(this.isMobile){
      this.drawer?.toggle();
    }
    
  }

}
