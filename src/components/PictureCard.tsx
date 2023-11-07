import { IonCard, IonImg, IonItem } from "@ionic/react";
import "./PictureCard.scss";

interface PictureCardProps {
  picture: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFocusPicture: React.Dispatch<React.SetStateAction<string>>;
  setOpenFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const PictureCard: React.FC<PictureCardProps> = ({
  picture,
  setIsOpen,
  setFocusPicture,
  setOpenFocus,
}) => {
  return (
    <IonCard
      className="picture-container"
      onClick={(e: any) => {
        setFocusPicture(picture), setIsOpen(true), setOpenFocus(true);
      }}
    >
      <IonItem>
        <IonImg src={picture} alt="party picture"></IonImg>
      </IonItem>
    </IonCard>
  );
};

export default PictureCard;
