import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/quiz/result.model';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'character', 'operation'];
  dataSource :Array<Result>;
  constructor(private router:Router, private route:ActivatedRoute,private ls:LocalStorageService,private dataS:DataService) { }

  ngOnInit(): void {
   this.dataSource= this.ls.getAnswers();
   console.log(this.dataSource)
  }
  go(id:number){
    this.router.navigate(['result'],{queryParams:{id:id}});
  }

}
