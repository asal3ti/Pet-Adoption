import { UpdateUserDTO } from "@/dtos";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

// Helper function to check if response is OK
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.msg || "An error occurred");
  }

  return res.json();
};

// GET api/user - Get all users (Admin only)
export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Get All Users Error:", error);
    throw error;
  }
};

// GET api/user/me - Get my user
export const getMyUser = async (token: string) => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Get My User Error:", error);
    throw error;
  }
};

// POST api/user/favorite/:animalId - Add to favorites
export const addFavorite = async (animalId: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/favorite/${animalId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Add Favorite Error:", error);
    throw error;
  }
};

// PATCH api/user/favorite/:animalId - Remove from favorites
export const removeFavorite = async (animalId: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/favorite/${animalId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Remove Favorite Error:", error);
    throw error;
  }
};

// DELETE api/user/:userId - Delete user account
export const deleteUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Delete User Error:", error);
    throw error;
  }
};

// PUT api/user - Update user account
export const updateUser = async (userData: UpdateUserDTO, token: string) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Update User Error:", error);
    throw error;
  }
};

// PUT api/user/password - Change user password
export const changePassword = async (newPassword: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Change Password Error:", error);
    throw error;
  }
};
