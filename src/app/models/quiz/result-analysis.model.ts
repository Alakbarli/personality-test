import { Answer } from "./answer.model";
import { TraitVariantConnection } from "./trait-variant-connection.model";

export class ResultAnalysis {
    id:number;
    testId:number;
    traitId:number;
    percentage:number;
    sumPoint:number;
}
export class Point{
    traitId:number;
    minPoint:number;
    maxPont:number;
}