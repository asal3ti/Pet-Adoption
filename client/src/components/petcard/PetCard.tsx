"use client";
import React from 'react';
import { Pet } from '@/types/Pet';
import './styles.css';

interface PetCardProps {
  pet: Pet;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  // Function to format and trim pet name
  const formatPetName = (name: string) => {
    const trimmedName = name.startsWith('*') ? name.slice(1).trim() : name;
    return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
  };

  // Default image URL
  const defaultImageUrl =
    'https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.png?h=260&iar=0&mh=260&mw=380&w=380&hash=01CB2D77A5A7FCCDF87DF2ED968048A2';

  return (
    <div className="pet-card bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={pet.url || defaultImageUrl}
        alt={formatPetName(pet.petName)}
        className=''
      />
      <div className="p-2 text-center">
        <h3 className="text-2xl font-semibold">{formatPetName(pet.petName)}</h3>
      </div>
    </div>
  );
};


