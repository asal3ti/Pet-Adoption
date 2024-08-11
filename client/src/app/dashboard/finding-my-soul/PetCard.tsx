import React, { useState } from 'react';
import './styles.css';
import { PetDetailModal } from '@/components';

const PetCard: React.FC = () => {
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

  return (
    <>
      {!showModal && (
        <div className="card" onClick={handleCardClick}>
          <img
            className="card__background"
            src="http://petharbor.com/get_image.asp?res=DETAIL&id=A518499&location=MONT"
            alt="Pet"
          />
          <div className="card__content">
            <div className="card__content--container">
              <h2 className="card__title">DJ</h2>
              <p>A friendly Turtle looking for a home.</p>
            </div>
            <button className="card__button" onClick={handleButtonClick}>
              see more
            </button>
          </div>
        </div>
      )}
      {showModal && <PetDetailModal onClose={handleCloseModal} />}
    </>
  );
};

export default PetCard;
