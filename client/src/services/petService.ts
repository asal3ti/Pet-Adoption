import { CreatePetDTO, UpdatePetDTO } from "@/dtos";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/pets";

// Helper function to check if response is OK
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.msg || "An error occurred");
  }
  return res.json();
};

// POST api/pets - Add a new pet (Admin only)
export const addPet = async (petData: CreatePetDTO, token: string) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Add Pet Error:", error);
    throw error;
  }
};

// GET api/pets - Get all pets
export const getAllPets = async () => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Get All Pets Error:", error);
    throw error;
  }
};

// GET api/pets/:animalId - Get a pet by ID
export const getPetById = async (animalId: string) => {
  try {
    const res = await fetch(`${API_URL}/${animalId}`, {
      method: "GET",
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Get Pet By ID Error:", error);
    throw error;
  }
};

// PUT api/pets/:animalId - Update a pet (Admin only)
export const updatePet = async (
  animalId: string,
  petData: UpdatePetDTO,
  token: string
) => {
  try {
    const res = await fetch(`${API_URL}/${animalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(petData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Update Pet Error:", error);
    throw error;
  }
};

// DELETE api/pets/:animalId - Remove a pet from the database (Admin only)
export const deletePet = async (animalId: string, token: string) => {
  try {
    const res = await fetch(`${API_URL}/${animalId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Delete Pet Error:", error);
    throw error;
  }
};
