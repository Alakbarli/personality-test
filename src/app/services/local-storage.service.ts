import { Injectable } from '@angular/core';
import { Answer } from '../models/quiz/answer.model';
import { Result } from '../models/quiz/result.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  setAnswer(result:Result){
    let data=new Array<Result>();
    if(localStorage.getItem("userResult")){
      data=JSON.parse(localStorage.getItem("userResult") as string)
    }
    data.push(result);
    localStorage.setItem("userResult",JSON.stringify(data));
  }
  getAnswer(id:string):Result{
    console.log(id)
     return (JSON.parse(localStorage.getItem("userResult") as string) as Array<Result>).find(x=>x.id==id) as Result;
  }
  getAnswers():Array<Result>{
    return JSON.parse(localStorage.getItem("userResult") as string);
 }
}
