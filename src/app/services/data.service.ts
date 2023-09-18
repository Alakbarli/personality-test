import { Injectable } from '@angular/core';
import { Test } from '../models/quiz/test.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    this.getDbLocalstorage();
  }
  db:Test;
  baseUrl: string = 'assets/db/';
  getDbLocalstorage(){
    if(window.localStorage.getItem("dbPersonTest")!=null){
      this.db=JSON.parse((localStorage.getItem("dbPersonTest")) as string);
    }
    else{
    fetch(this.baseUrl+"data.json")
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.db=json;
      localStorage.setItem("dbPersonTest",JSON.stringify(this.db));
    });
    }
  }

  getTraitsCharacter(){
   return fetch(this.baseUrl+"characterTraits.json")
    .then(res => res.json())
  }
  getTraitDesc(){
    return fetch(this.baseUrl+"secondaryTraitData.json")
     .then(res => res.json())
   }
}
