import { TraitVariantConnection } from "./trait-variant-connection.model";

export class Answer {
    constructor(id:number,questionId:number,variantId:number,traitConnection:Array<TraitVariantConnection>|undefined){
        this.id=id;
        this.questionId=questionId;
        this.variantId=variantId;
        this.traitConnection=traitConnection;
    }
    id:number;
    questionId:number;
    variantId:number;
    traitConnection:Array<TraitVariantConnection>|undefined;
}
