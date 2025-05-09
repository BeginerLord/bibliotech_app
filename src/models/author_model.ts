export interface AuthorModel {
    fullName: string;
    birthDate: string;
    nationality: string;
    uuid: string;
    statusEntity: "ACTIVE" | "INACTIVE";  // Using literal type for better type safety
}

// DTO for creating a new author (without uuid and statusEntity)
export type CreateAuthorDto = Omit<AuthorModel, "uuid" | "statusEntity">;

// Full DTO when needed (includes all fields)
export type AuthorModelDto = AuthorModel;

// For updating an author (all fields optional)
export type UpdateAuthorModel = Partial<AuthorModel>;