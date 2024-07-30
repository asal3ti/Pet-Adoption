export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string; // Optional, only include if updating password
  role?: string; // Optional, can be included if changing user role
}
