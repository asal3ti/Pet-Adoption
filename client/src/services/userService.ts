import { UpdateUserDTO } from "@/dtos";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

// GET api/user - Get all users (Admin only
export const getAllUsers = async (token: string) => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// Get api/user/me - Get my user
export const getMyUser = async (token: string) => {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// POST api/user/favorite/:animalId - Add to favorites
export const addFavorite = async (animalId: string, token: string) => {
  const res = await fetch(`${API_URL}/favorite/${animalId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// PATCH api/user/favorite/:animalId - Remove from favorites
export const removeFavorite = async (animalId: string, token: string) => {
  const res = await fetch(`${API_URL}/favorite/${animalId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// DELETE api/user/:userId - Delete user account
export const deleteUser = async (userId: string, token: string) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

// PUT api/user - Update user account
export const updateUser = async (userData: UpdateUserDTO, token: string) => {
  const res = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  return res;
};
