import { IonCard, IonImg, IonItem } from "@ionic/react";
import "./PictureCardFocus.scss";

interface PictureCardProps {
  picture: string;
  openFocus: boolean;
  setOpenFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const PictureCardFocus: React.FC<PictureCardProps> = ({
  picture,
  openFocus,
  setOpenFocus,
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFocus(false);
  };

  return (
    <div
      onClick={handleClose}
      className={openFocus ? "background-focus" : "background-focus hidden"}
    >
      <IonCard className="focus-container" onClick={(e) => e.stopPropagation()}>
        <IonItem lines="none">
          <IonImg src={picture} alt="party picture"></IonImg>
        </IonItem>
      </IonCard>
    </div>
  );
};

export default PictureCardFocus;
