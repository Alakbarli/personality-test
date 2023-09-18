import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Traits } from 'src/app/enums/traits';
import { Result } from 'src/app/models/quiz/result.model';
import { Trait } from 'src/app/models/quiz/trait.model';
import { UserAnswers } from 'src/app/models/quiz/user-answers.model';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  id:string;
  result:Result;
  list:Array<UserAnswers>=[];
  secondaryTraitData:any;
  constructor(private route:ActivatedRoute,private ls:LocalStorageService,private dataS:DataService) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(res=>this.id =res["id"])
    this.result= this.ls.getAnswer(this.id);
   await this.dataS.getTraitDesc().then(x=>this.secondaryTraitData=x);
    this.generateText();
  }
  generateText(){
    this.result.personPoints.forEach(x=>{
      console.log(x)
      let data=new UserAnswers();
      data.name=this.dataS.db.traits.find(y=>y.id==x.traitId)?.name as string
      data.point=x.percentage+" %";
      switch (x.traitId) {
        case Traits.Agreeableness:
          if(x.percentage>66){
            data.description=this.secondaryTraitData[x.traitId+"-1"]
          }
          else if(x.percentage>33){
            data.description=this.secondaryTraitData[x.traitId+"-2"]
          }
          else{
            data.description=this.secondaryTraitData[x.traitId+"-3"]
          }
          break;
        case Traits['Extraversion vs. Introversion']:
          if(x.percentage>66){
            data.description=this.secondaryTraitData[x.traitId+"-1"]
          }
          else if(x.percentage>33){
            data.description=this.secondaryTraitData[x.traitId+"-2"]
          }
          else{
            data.description=this.secondaryTraitData[x.traitId+"-3"]
          }
          break;
        case Traits['Openness to Experience']:
          if(x.percentage>66){
            data.description=this.secondaryTraitData[x.traitId+"-1"]
          }
          else if(x.percentage>33){
            data.description=this.secondaryTraitData[x.traitId+"-2"]
          }
          else{
            data.description=this.secondaryTraitData[x.traitId+"-3"]
          }
          break;
        case Traits['Emotional Stability (Neuroticism)']:
          if(x.percentage>66){
            data.description=this.secondaryTraitData[x.traitId+"-1"]
          }
          else if(x.percentage>33){
            data.description=this.secondaryTraitData[x.traitId+"-2"]
          }
          else{
            data.description=this.secondaryTraitData[x.traitId+"-3"]
          }
          break;
        case Traits.Conscientiousness:
          if(x.percentage>66){
            data.description=this.secondaryTraitData[x.traitId+"-1"]
          }
          else if(x.percentage>33){
            data.description=this.secondaryTraitData[x.traitId+"-2"]
          }
          else{
            data.description=this.secondaryTraitData[x.traitId+"-3"]
          }
          break;
      }
      this.list.push(data);
    })
  }

}

