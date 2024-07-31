const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { CreateUserDTO } from "@/dtos";

// Verify token
export const verify = async (token: string): Promise<Response> => {
  const res = await fetch(`${API_URL}/api/auth`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

// Sign user
export const signup = async (data: CreateUserDTO): Promise<Response> => {
  if (!data.role) {
    data.role = "user";
  }

  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

// Login user
export const login = async (data: CreateUserDTO): Promise<Response> => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
