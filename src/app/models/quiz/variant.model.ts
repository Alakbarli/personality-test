import { TraitVariantConnection } from "./trait-variant-connection.model";
import { Trait } from "./trait.model";

export class Variant {
    id:number;
    text:string;
    questionId:number;
    traitVariantConnection:Array<TraitVariantConnection>;
}
