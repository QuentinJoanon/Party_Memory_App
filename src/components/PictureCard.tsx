import { IonCard, IonImg, IonItem } from "@ionic/react";
import "./PictureCard.scss";

interface PictureCardProps {
  picture: string;
}

const PictureCard: React.FC<PictureCardProps> = ({ picture }) => {
  return (
    <IonCard className="picture-container">
      <IonItem>
        <IonImg
          src={picture}
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></IonImg>
      </IonItem>
    </IonCard>
  );
};

export default PictureCard;
