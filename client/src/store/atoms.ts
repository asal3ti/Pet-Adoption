import { atom } from "jotai";
import { User } from "../types/User";
import { Pet } from "../types/Pet";

// Atom to store recently visited items
//export const recentlyVisitedAtom = atom<string[]>([]);

// Atom to store the list of pets
export const petsAtom = atom<Pet[]>([]);

// Atom to store the list of users (Admin)
export const usersAtom = atom<User[]>([]);

// Atom to store the JWT token
export const tokenAtom = atom<string>("");

// Atom to manage authentication status, derived from tokenAtom
export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));
