"use client";
import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/atoms";
import { addFavorite, removeFavorite } from "@/services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useMyUser } from "@/hooks/useMyUser";
import { User } from "@/types/User";

interface Props {
  animalId: string;
  onClose: () => void;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<
    SetStateAction<
      "success" | "info" | "warning" | "error" | "loading" | undefined
    >
  >;
}

const PetAction = ({ animalId, onClose, setDisplay, setType }: Props) => {
  const [token] = useAtom(tokenAtom);
  const { user, setUser } = useMyUser();

  const adoptAnimal = async () => {
    try {
      const favorites = await addFavorite(animalId, token);
      setUser({ ...user, favorites });
      onClose();
      setDisplay(true);
      setType("success");
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAnimal = async () => {
    try {
      const favorites = await removeFavorite(animalId, token);
      setUser({ ...user, favorites });
      onClose();
      setDisplay(true);
      setType("info");
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const { favorites } = user as User;

  return (
    <>
      {favorites.indexOf(animalId) === -1 ? (
        <button
          className="modal-adopt-button adopt"
          onClick={() => adoptAnimal()}
        >
          Adopt <FontAwesomeIcon icon={faHeart} />
        </button>
      ) : (
        <button
          className="modal-adopt-button remove"
          onClick={() => removeAnimal()}
        >
          Remove <FontAwesomeIcon icon={faHeartBroken} />
        </button>
      )}
    </>
  );
};

export default PetAction;
