export interface UserModel {
  username: string;
  dni: string;
  email: string;
  password: string;
  phone: string;
  roleRequest: {
    roleListName: string[];
  };
}