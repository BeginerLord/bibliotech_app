export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dni: string;
  status?: "ACTIVE" | "ARCHIVED";
}

// DTO for creating a new user
export type CreateUserDto = Omit<UserModel, "statusEntity">;

// Full DTO when needed (includes all fields)
export type UserModelDto = UserModel;

// For updating a user (all fields optional except for the ones required in update endpoint)
export type UpdateUserModel = Pick<UserModel, "firstName" | "lastName" | "email" | "phoneNumber" | "address">;


export interface CountUserDto {
  count: string;
}