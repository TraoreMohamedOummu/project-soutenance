export interface User {

    id : number;
    name : string;
    email : string;
    password: string | undefined | null;
    telephone : string;
    adresse : string;
    role_id : number;
    photo : string | null;
}