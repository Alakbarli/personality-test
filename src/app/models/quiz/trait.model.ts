import { TraitVariantConnection } from "./trait-variant-connection.model";

export class Trait {
    id:number;
    testId:number;
    name:string;
    traitsConnection:Array<TraitVariantConnection>
}
