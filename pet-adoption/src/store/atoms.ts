import { atom } from 'jotai';
import { User } from '../types/User';
import { Pet } from '../types/Pet';

// Atom to store recently visited items
export const recentlyVisitedAtom = atom<string[]>([]);

// Atom to store the list of pets
export const petsAtom = atom<Pet[]>([]);

// Atom to store the user information
export const userAtom = atom<User | null>(null);

// Atom to store the authentication status
export const isAuthenticatedAtom = atom<boolean>(false);

// Atom to store the JWT token
export const jwtUserAtom = atom<string | null>(null);
