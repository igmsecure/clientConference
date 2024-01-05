import { AxiosResponse } from "axios";

export default interface Option {
    id: number;
    name: string;
}

export interface Author {
    id: number;
    middle_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    status: string;
    country: string | null;
    city: string | null;
    affiliation: string | null;
    biography: string;
    image: string;
    time_create: string;
    last_modified: string;
}

export type Response = Promise<AxiosResponse> | any