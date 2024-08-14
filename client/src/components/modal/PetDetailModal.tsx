import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faRuler,
  faDroplet,
  faHeartPulse,
  faCalendarDays,
  faShieldDog,
} from "@fortawesome/free-solid-svg-icons";
import "./modalStyles.css";
import { Pet } from "@/types/Pet";
import PetAction from "./PetAction";
interface PetDetailModalProps {
  onClose: () => void;
  pet: Pet;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<
    SetStateAction<
      "success" | "info" | "warning" | "error" | "loading" | undefined
    >
  >;
}

// Utility function to capitalize text
const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  onClose,
  pet,
  setDisplay,
  setType,
}) => {
  // Default image URL
  // When is not found the url is redirect to a placeholder, we need to fetch it to be able to put our placeholder
  const defaultImageUrl = "/url-animal-no-exist.webp";
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &#10005; {/* Close icon */}
        </button>
        <div className="modal-left">
          <Image
            src={pet.url || defaultImageUrl}
            alt={capitalizeText(pet.petName)}
            className="modal-image"
            width={400}
            height={400}
          />
        </div>
        <div className="modal-right">
          <h2 className="modal-title">
            <FontAwesomeIcon icon={faPaw} /> {capitalizeText(pet.petName)}
          </h2>
          <p>
            <FontAwesomeIcon icon={faRuler} /> <strong>Size:</strong>{" "}
            {capitalizeText(pet.petSize)}
          </p>
          <p>
            <FontAwesomeIcon icon={faDroplet} /> <strong>Color:</strong>{" "}
            {capitalizeText(pet.color)}
          </p>
          <p>
            <FontAwesomeIcon icon={faHeartPulse} /> <strong>Age:</strong>{" "}
            {capitalizeText(pet.petAge)}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} />{" "}
            <strong>Available Since:</strong>{" "}
            {new Date(pet.inDate).toLocaleDateString()}
          </p>
          <p>
            <FontAwesomeIcon icon={faShieldDog} /> <strong>Breed:</strong>{" "}
            {capitalizeText(pet.breed)}
          </p>
          <PetAction
            animalId={pet.animalId}
            onClose={onClose}
            setDisplay={setDisplay}
            setType={setType}
          />
        </div>
      </div>
    </div>
  );
};
