import React, { useState } from 'react';
import './styles.css';
import { PetDetailModal } from '@/components';
import { Pet } from '@/types/Pet';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card click handler from firing
    setShowModal(true);
  };

  // Function to format pet name
  const formatPetName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Function to format breed
  const formatBreed = (breed: string) => {
    // Slice the breed string at "/" and make it lowercase
    return breed.split('/')[0].trim().toLowerCase();
  };

  // Function to format description based on animalType
  const formatDescription = (animalType: string, breed: string) => {
    if (animalType.toLowerCase() === 'other') {
      return `A friendly ${formatBreed(breed)} looking for a home.`;
    } else {
      return `A friendly ${animalType.toLowerCase()} looking for a home.`;
    }
  };

  // Default image URL
  const defaultImageUrl = 'https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.png?h=260&iar=0&mh=260&mw=380&w=380&hash=01CB2D77A5A7FCCDF87DF2ED968048A2';

  return (
    <>
      {!showModal && (
        <div className="card" onClick={handleCardClick}>
          <img className="card__background" src={pet.url || defaultImageUrl} alt={pet.petName} />
          <div className="card__content">
            <div className="card__content--container">
              {/* <h2 className="card__title">{formatPetName(pet.petName)}</h2> */}
              <p>{formatDescription(pet.animalType, pet.breed)}</p>
            </div>
            <button className="card__button" onClick={handleButtonClick}>
              see more
            </button>
          </div>
          <div className="card__name">{formatPetName(pet.petName)}</div>
        </div>
      )}
      {showModal && <PetDetailModal onClose={handleCloseModal} pet={pet} />}
    </>
  );
};

export default PetCard;
