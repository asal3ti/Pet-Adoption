export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role: "user" | "admin";
  favorites: string[]; // Array of Pet IDs
  emailVerified: boolean;
}
