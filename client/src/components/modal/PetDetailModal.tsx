import React from "react";
import Image from "next/image";
import "./modalStyles.css";

export const PetDetailModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          &#10005; {/* Close icon, can replace with an SVG or an image */}
        </button>
        <div className="modal-left">
          <Image
            src="http://www.petharbor.com/get_image.asp?res=DETAIL&id=A518499&location=MONT"
            alt="Pet"
            className="modal-image"
            width={300}
            height={300}
          />
        </div>
        <div className="modal-right">
          <h2 className="modal-title">DJ</h2>
          <p>
            <strong>Species:</strong> Turtle / Red-Eared Slider
          </p>
          <p>
            <strong>Size:</strong> Small
          </p>
          <p>
            <strong>Color:</strong> Green
          </p>
          <p>
            <strong>Age:</strong> Not Specified
          </p>
          <p>
            <strong>Owner:</strong> OWNER SUR
          </p>
          <p>
            <strong>Available Since:</strong> 04/27/2024
          </p>
          <button className="modal-adopt-button">Adopt</button>
        </div>
      </div>
    </div>
  );
};
