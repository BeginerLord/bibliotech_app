export interface PersonModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dni: string;

}

export type PersonModelDto=Omit<PersonModel, "uuid">;
export type UpdatePersonModel = Partial<PersonModel>;