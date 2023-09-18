import { Question } from "./question.model";
import { Trait } from "./trait.model";

export class Test {
    id:number;
    name:string;
    traits:Array<Trait>;
    questions:Array<Question>;
}
