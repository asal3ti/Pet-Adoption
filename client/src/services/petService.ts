import { CreatePetDTO, UpdatePetDTO } from "@/dtos";
import {} from "@/dtos/createPetDto";
import { tokenAtom } from "@/store/atoms";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/pets";

// POST api/pets - Add a new pet (Admin only)
export const addPet = async (petData: CreatePetDTO) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAtom}`,
    },
    body: JSON.stringify(petData),
  });

  return res;
};

// GET api/pets - Get all pets
export const getAllPets = async () => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
  });

  return res;
};

// GET api/pets/:animalId - Get a pet by ID
export const getPetById = async (animalId: string) => {
  const res = await fetch(`${API_URL}/${animalId}`, {
    method: "GET",
  });

  return res;
};

// PUT api/pets/:animalId - Update a pet (Admin only)
export const updatePet = async (animalId: string, petData: UpdatePetDTO) => {
  const res = await fetch(`${API_URL}/${animalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAtom}`,
    },
    body: JSON.stringify(petData),
  });

  return res;
};

// DELETE api/pets/:animalId - Remove a pet from the database (Admin only)
export const deletePet = async (animalId: string) => {
  const res = await fetch(`${API_URL}/${animalId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenAtom}`,
    },
  });

  return res;
};
