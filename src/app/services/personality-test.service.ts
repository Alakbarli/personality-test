import { Injectable } from '@angular/core';
import { Test } from '../models/quiz/test.model';
import { Point, ResultAnalysis } from '../models/quiz/result-analysis.model';
import { Answer } from '../models/quiz/answer.model';
import { LocalStorageService } from './local-storage.service';
import { TraitVariantConnection } from '../models/quiz/trait-variant-connection.model';
import { Result } from '../models/quiz/result.model';
import { Traits } from '../enums/traits';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalityTestService {
  constructor(private ls:LocalStorageService,private ds:DataService) { }
  calculateTraitSumPercentage(test:Test,answers:Array<Answer>):Array<ResultAnalysis>{
    //let answers=this.ls.getAnswer(test.id);
    let userTraits=new Array<ResultAnalysis>();
    //calculate sum point 
    answers.forEach(
      an=>{
        an.traitConnection?.forEach(
          tr=>{
            if(userTraits.some(r=>r.traitId==tr.traitId)){
              let raI=userTraits.findIndex(r=>r.traitId==tr.traitId);
              userTraits[raI].sumPoint+=(tr.point);
            }
            else{
              let ra=new ResultAnalysis();
              ra.testId=test.id;
              ra.traitId=tr.traitId;
              ra.sumPoint=tr.point;
              userTraits.push(ra);
            }
          }
        )
      }
    )


    //calculate sum point percentage
    let maxMinPoints=this.calculateTraitsMaxAndMinPoint(test);
    maxMinPoints.forEach(x=>{
      let userTrtIndex=userTraits.findIndex(tr=>tr.traitId==x.traitId);
      let usrT=userTraits.find(tr=>tr.traitId==x.traitId) as ResultAnalysis;
      let percentage=0;
      
      if(x.minPoint<0){
        percentage=((usrT.sumPoint+Math.abs(x.minPoint))/(Math.abs(x.minPoint)+Math.abs(x.maxPont)+1))*100;
      }
      else{
        percentage=((usrT.sumPoint+Math.abs(x.minPoint))/(Math.abs(x.minPoint)+Math.abs(x.maxPont)))*100;
      }
      if(!Number.isInteger(percentage)){
        percentage=Math.round(percentage*10)/10;
      }
      userTraits[userTrtIndex].percentage=percentage;
    })
    return userTraits;


  }
  calculateTraitsMaxAndMinPoint(test:Test):Array<Point>{
    let result=new Array<Point>();
    test.traits.forEach(x=>{let raMax=new Point();raMax.traitId=x.id;raMax.maxPont=0,raMax.minPoint=0;result.push(raMax)});
    test.questions.forEach(function(q){
      let sumPointList=new Array<Point>();
      q.variants.forEach(function(v){
        v.traitVariantConnection.forEach(function(traitConn){
          if(sumPointList.some(r=>r.traitId==traitConn.traitId)){
            let maxPoint=sumPointList.find(r=>r.traitId==traitConn.traitId)?.maxPont;
            let minPoint=sumPointList.find(r=>r.traitId==traitConn.traitId)?.minPoint;
            if((maxPoint as number)<traitConn.point){
              let raI=sumPointList.findIndex(r=>r.traitId==traitConn.traitId);
              sumPointList[raI].maxPont=traitConn.point;
            }
            if((minPoint as number)>traitConn.point){
              let raI=sumPointList.findIndex(r=>r.traitId==traitConn.traitId);
              sumPointList[raI].minPoint=traitConn.point;
            }
          }
          else{
            let ra=new Point();
            ra.traitId=traitConn.traitId;
            ra.maxPont=traitConn.point;
            ra.minPoint=traitConn.point;
            sumPointList.push(ra);
          }
        })
      })
      sumPointList.forEach(points=>{
        let sumTraitindex=result.findIndex(x=>x.traitId==points.traitId);
        result[sumTraitindex].maxPont+=points.maxPont;
        result[sumTraitindex].minPoint+=points.minPoint;
      })
    })
    return result;
  }

  async analyze(testId:number,personPoints:Array<ResultAnalysis>){
    let result=new Result();
    result.testId=testId;
    result.id=(Math.random() + 1).toString(36).substring(7)+new Date().getTime();
    result.personPoints=personPoints;
    //trait percentages
    //
    let extrInt=personPoints.find(x=>x.traitId==Traits['Extraversion vs. Introversion'])?.percentage as number;
    let consc=personPoints.find(x=>x.traitId==Traits.Conscientiousness)?.percentage as number;
    let openToExp=personPoints.find(x=>x.traitId==Traits['Openness to Experience'])?.percentage as number;
    let agr=personPoints.find(x=>x.traitId==Traits.Agreeableness)?.percentage as number;
    let emot=personPoints.find(x=>x.traitId==Traits['Emotional Stability (Neuroticism)'])?.percentage as number;
    
    const traitValues = [
      extrInt < 50 ? "0" : "1",
      consc < 50 ? "0" : "1",
      openToExp < 50 ? "0" : "1",
      agr < 50 ? "0" : "1",
      emot < 50 ? "0" : "1",
    ].join("");

    let characterTraits;
    await this.ds.getTraitsCharacter().then(res=>characterTraits=res);
    const characterInfo = (characterTraits as any)[traitValues];
    result.character=characterInfo.character;
    result.description=characterInfo.description;
    return result;
  }
}
