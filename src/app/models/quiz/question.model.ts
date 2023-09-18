import { Variant } from "./variant.model";

export class Question {
    id:number;
    question:string;
    testId:number;
    variants:Array<Variant>
}

//
