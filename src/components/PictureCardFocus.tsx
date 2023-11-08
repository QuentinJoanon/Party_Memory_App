import { IonButton, IonCard, IonIcon, IonImg, IonItem } from "@ionic/react";
import "./PictureCardFocus.scss";
import { downloadPhoto } from "../firebaseConfig";
import { cloudDownloadOutline } from "ionicons/icons";

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

  const getFileName = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1].split("?")[0];
  };

  async function downloadPicture(picture: string) {
    const downloadURL = await downloadPhoto(picture);
    if (downloadURL) {
      // Créer un élément a pour forcer le téléchargement
      const a = document.createElement("a");
      a.href = downloadURL;
      a.download = getFileName(downloadURL);
      a.target = "_blank";
      console.log(getFileName(downloadURL));
      document.body.appendChild(a); // Ajoutez l'élément a à la page
      a.click(); // Simuler un clic pour télécharger
      document.body.removeChild(a); // Nettoyez en supprimant l'élément a
    }
  }

  return (
    <div
      onClick={handleClose}
      className={openFocus ? "background-focus" : "background-focus hidden"}
    >
      <IonCard className="focus-container" onClick={(e) => e.stopPropagation()}>
        <IonItem lines="none">
          <IonImg src={picture} alt="party picture"></IonImg>
        </IonItem>
        <IonButton onClick={(e: any) => downloadPicture(picture)}>
          <IonIcon icon={cloudDownloadOutline} slot="icon-only"></IonIcon>
        </IonButton>
      </IonCard>
    </div>
  );
};

export default PictureCardFocus;
