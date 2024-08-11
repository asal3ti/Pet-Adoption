"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRuler, faDroplet, faHeartPulse, faCalendarDays, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons'; // Import the regular heart icon
import './modalStyles.css';
import { Pet } from '@/types/Pet';

// Utility function to capitalize text
const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

interface PetDetailModalProps {
  onClose: () => void;
  pet: Pet;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({ onClose, pet }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &#10005; {/* Close icon */}
        </button>
        <div className="modal-left">
          <img src={pet.url} alt={capitalizeText(pet.petName)} className="modal-image" />
        </div>
        <div className="modal-right">
          <h2 className="modal-title">
            <FontAwesomeIcon icon={faPaw} /> {capitalizeText(pet.petName)}
          </h2>
          <p>
            <FontAwesomeIcon icon={faRuler} /> <strong>Size:</strong> {capitalizeText(pet.petSize)}
          </p>
          <p>
            <FontAwesomeIcon icon={faDroplet} /> <strong>Color:</strong> {capitalizeText(pet.color)}
          </p>
          <p>
            <FontAwesomeIcon icon={faHeartPulse} /> <strong>Age:</strong> {capitalizeText(pet.petAge)}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} /> <strong>Available Since:</strong> {new Date(pet.inDate).toLocaleDateString()}
          </p>
          <p>
            <FontAwesomeIcon icon={faShieldDog} /> <strong>Breed:</strong> {capitalizeText(pet.breed)}
          </p>
          <button className="modal-adopt-button">
            Adopt <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

