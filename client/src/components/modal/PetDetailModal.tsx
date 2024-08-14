import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRuler, faDroplet, faHeartPulse, faCalendarDays, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import './modalStyles.css';
import { Pet } from '@/types/Pet';

// Utility function to capitalize text
const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Utility function to trim and capitalize pet name
const trimAndCapitalizePetName = (name: string): string => {
  const trimmedName = name.startsWith('*') ? name.slice(1).trim() : name;
  return capitalizeText(trimmedName);
};

interface PetDetailModalProps {
  onClose: () => void;
  pet: Pet;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({ onClose, pet }) => {
  // Default image URL
  const defaultImageUrl = 'https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.png?h=260&iar=0&mh=260&mw=380&w=380&hash=01CB2D77A5A7FCCDF87DF2ED968048A2';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &#10005; {/* Close icon */}
        </button>
        <div className="modal-left">
          <img src={pet.url || defaultImageUrl} alt={trimAndCapitalizePetName(pet.petName)} className="modal-image" />
        </div>
        <div className="modal-right">
          <h2 className="modal-title">
            <FontAwesomeIcon icon={faPaw} /> {trimAndCapitalizePetName(pet.petName)}
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
