export interface AuthorModel {
    fullName: string;
    birthDate: string; // o Date si prefieres trabajar con objetos Date
    nationality: string;
    uuid: string;
    statusEntity: string;
}

export type AuthorModelDto = Omit<AuthorModel, "uuid">;
export type UpdateAuthorModel = Partial<AuthorModel>;