import { City } from "./City"
import { Agence } from "./agence"
import { TypeProperty } from "./type_property"
import { User } from "./user/Users"

export interface Property {
    id :number
    name : string
    price : number
    quartier : string
    nombre_piece : number
    nombre_chambre : number
    nombre_salle_bain : number
    is_eau : number
    is_electricite : number
    is_salle_gym : number
    longueur : number
    largueur : number
    adresse : string
    city : City
    agence : Agence
    type_property : TypeProperty
    user : User,
    status : number,
    desc : string,
    agence_id : number,
    city_id : number, 
    type_property_id : number
}