import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/quiz/answer.model';
import { Question } from 'src/app/models/quiz/question.model';
import { Test } from 'src/app/models/quiz/test.model';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PersonalityTestService } from 'src/app/services/personality-test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  userAnswers:Array<Answer>=[];
  test:Test;
  question:Question;
  questionIndex:number=0;
  constructor(private testService:PersonalityTestService, private lcService:LocalStorageService,private router:Router, private dataServcie:DataService) { }
  ngOnInit(): void {
    this.test=this.dataServcie.db;
    this.setQuestion();
  }
  letter(number:number):string{
    return ["A","B","C","D","E","F","G","H"][number];
  }
  setQuestion(){
    this.question=this.test.questions[this.questionIndex];
  }
  createAnswer(questionId:number,variantId:number):void{
    if(this.checkAnswer(questionId)){
      let indexAnswer=this.userAnswers.findIndex(x=>x.questionId==questionId);
      this.userAnswers[indexAnswer]=new Answer(this.questionIndex,questionId,variantId,this.question.variants.find(x=>x.id==variantId)?.traitVariantConnection);
      if(!this.allQuestionDone){
        this.next();
      }
    }
    else{
      this.userAnswers[this.questionIndex]=new Answer(this.questionIndex,questionId,variantId,this.question.variants.find(x=>x.id==variantId)?.traitVariantConnection);
      if(!this.allQuestionDone){
        this.next();
      }
    }
  }
  checkAnswer(questionId:number):boolean{
    return this.userAnswers.some(x=>x.questionId==questionId);
  }
  checkVariant(questionId:number,variantId:number):boolean{
    return this.userAnswers.some(x=>x.questionId==questionId&&x.variantId==variantId);
  }
  get allQuestionDone():boolean{
    return this.test.questions.every(
      q=>this.checkAnswer(q.id)
    )
  }
  get hasNextQuestion():boolean{
    return this.test.questions.length>this.questionIndex+1;
  }
  get hasPrevQuestion():boolean{
    return !(this.questionIndex==0);
  }
  get progress(){
    if(this.allQuestionDone){
      return 100;
    }
    if(this.questionIndex==0){
      return 0;
    }
    return  (this.questionIndex/this.test.questions.length)*100;
  }
  next(){
    if(this.hasNextQuestion){
      this.questionIndex++;
      this.setQuestion();
    }
  }
  prev(){
    if(this.hasPrevQuestion){
      this.questionIndex--;
      this.setQuestion();
    }
  }
  submit(){
    let userResult= this.testService.calculateTraitSumPercentage(this.test,this.userAnswers);
    this.testService.analyze(this.test.id,userResult).then(
      res=>{
        console.log(res)
        this.lcService.setAnswer(res);
        this.router.navigate(['result'],{queryParams:{id:res.id}});
      }
    )
    
    
  }

}
