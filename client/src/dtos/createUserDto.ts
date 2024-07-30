export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role?: string; // Optional field, defaults to user
  passwordConfirm?: string;
  api?: string; // This is in case the api failed to create the user
}
