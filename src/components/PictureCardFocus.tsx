import { IonButton, IonCard, IonIcon, IonImg, IonItem } from "@ionic/react";
import "./PictureCardFocus.scss";
import { deletePhoto, downloadPhoto } from "../firebaseConfig";
import { cloudDownloadOutline, trashOutline } from "ionicons/icons";
import { saveAs } from 'file-saver'

interface PictureCardProps {
  picture: string;
  openFocus: boolean;
  setOpenFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePictureUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PictureCardFocus: React.FC<PictureCardProps> = ({
  picture,
  openFocus,
  setOpenFocus,
  setAlertIsOpen,
  setDeletePictureUrl,
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFocus(false);
  };

  const getFileName = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1].split("?")[0];
  };

/*   async function downloadPicture(pictureUrl: string) {
    const downloadURL = await downloadPhoto(pictureUrl);
    if (downloadURL) {
      // Créer un élément a pour forcer le téléchargement
      const a = document.createElement("a");
      a.href = downloadURL;
      a.download = getFileName(downloadURL);
      a.target = "_blank";
      document.body.appendChild(a); // Ajoutez l'élément a à la page
      a.click(); // Simuler un clic pour télécharger
      document.body.removeChild(a); // Nettoyez en supprimant l'élément a
    }
  }

  const handleDownload = () => {
    // Create a Blob from the data and trigger download
    const blob = new Blob([data], { type: 'text/x-vcard;charset=utf-8' })
    const today = new Date()
    const date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    const dateTime = date + '-' + time
    saveAs(blob, `${dateTime}_card.vcf`)
  } */

  async function downloadPicture(pictureUrl: string) {
    const downloadURL = await downloadPhoto(pictureUrl);
    if (downloadURL) {
      saveAs(downloadURL, getFileName(downloadURL));
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
        <div>
          <IonButton onClick={() => downloadPicture(picture)}>
            <IonIcon icon={cloudDownloadOutline} slot="icon-only"></IonIcon>
          </IonButton>
          <IonButton
            slot="end"
            color="danger"
            onClick={() => {
              setAlertIsOpen(true), setDeletePictureUrl(picture);
            }}
          >
            <IonIcon icon={trashOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </div>
      </IonCard>
    </div>
  );
};

export default PictureCardFocus;
