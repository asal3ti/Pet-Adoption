import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import "./styles.css";
import { PetDetailModal } from "@/components";
import { Pet } from "@/types/Pet";

interface PetCardProps {
  pet: Pet;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<
    SetStateAction<
      "success" | "info" | "warning" | "error" | "loading" | undefined
    >
  >;
}

const PetCard: React.FC<PetCardProps> = ({ pet, setDisplay, setType }) => {
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
    return breed.split("/")[0].trim().toLowerCase();
  };

  // Function to format description based on animalType
  const formatDescription = (animalType: string, breed: string) => {
    if (animalType.toLowerCase() === "other") {
      return `A friendly ${formatBreed(breed)} looking for a home.`;
    } else {
      return `A friendly ${animalType.toLowerCase()} looking for a home.`;
    }
  };

  // Default image URL
  // When is not found the url is redirect to a placeholder, we need to fetch it to be able to put our placeholder
  const defaultImageUrl = "/url-animal-no-exist.webp";

  return (
    <>
      <div className="card" onClick={handleCardClick}>
        <Image
          className="card__background"
          src={pet.url.includes("no_pic_d.jpg") ? defaultImageUrl : pet.url}
          alt={pet.petName}
          height={400}
          width={400}
        />
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

      {showModal && (
        <PetDetailModal
          onClose={handleCloseModal}
          pet={pet}
          setDisplay={setDisplay}
          setType={setType}
        />
      )}
    </>
  );
};

export default PetCard;
