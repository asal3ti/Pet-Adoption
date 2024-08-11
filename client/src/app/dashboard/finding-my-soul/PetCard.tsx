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

  // Function to capitalize the first letter and make the rest lowercase
  const formatPetName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <>
      {!showModal && (
        <div className="card" onClick={handleCardClick}>
          <img className="card__background" src={pet.url} alt={pet.petName} />
          <div className="card__content">
            <div className="card__content--container">
              <h2 className="card__title">{pet.petName}</h2>
              <p>{`A friendly ${pet.animalType} looking for a home.`}</p>
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
