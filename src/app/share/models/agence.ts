import { City } from "./City";

export interface Agence {
    id : number;
    name: string;
    desc : string;
    city_id : number,
    city : City
}