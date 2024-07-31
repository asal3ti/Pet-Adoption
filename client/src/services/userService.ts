import { UpdateUserDTO } from "@/dtos";
import { tokenAtom } from "@/store/atoms";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

// GET api/user - Get all users (Admin only
export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenAtom}`,
    },
  });

  return res;
};

// POST api/user/favorite/:animalId - Add to favorites
export const addFavorite = async (animalId: string) => {
  const res = await fetch(`${API_URL}/favorite/${animalId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenAtom}`,
    },
  });

  return res;
};

// PATCH api/user/favorite/:animalId - Remove from favorites
export const removeFavorite = async (animalId: string) => {
  const res = await fetch(`${API_URL}/favorite/${animalId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${tokenAtom}`,
    },
  });

  return res;
};

// DELETE api/user/:userId - Delete user account
export const deleteUser = async (userId: string) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenAtom}`,
    },
  });

  return res;
};

// PUT api/user - Update user account
export const updateUser = async (userData: UpdateUserDTO) => {
  const res = await fetch(`${API_URL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAtom}`,
    },
    body: JSON.stringify(userData),
  });

  return res;
};
