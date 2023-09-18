import { ResultAnalysis } from "./result-analysis.model";

export class Result {
    id:string;
    testId:number;
    character:string;
    description:string;
    personPoints:Array<ResultAnalysis>
}
