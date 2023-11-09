import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Party.scss";
import MemberBanner from "../components/MemberBanner";
import PictureCard from "../components/PictureCard";
import { IUserData, useUserContext } from "../context/user";
import { RouteComponentProps } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import {
  addPictureOnUserEvent,
  db,
  deletePhoto,
  getCurrentEvent,
  getUserDocument,
  uploadPhoto,
} from "../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import PictureCardFocus from "../components/PictureCardFocus";

interface PartyPageProps
  extends RouteComponentProps<{
    slug: string;
  }> {}

const Party: React.FC<PartyPageProps> = ({ match }) => {
  const { user, userData, setUserData } = useUserContext();
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [focusPicture, setFocusPicture] = useState("");
  const [openFocus, setOpenFocus] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [deletePictureUrl, setDeletePictureUrl] = useState("");

  const pictureEvent = userData?.events.find(
    (event) => event.slug === match.params.slug
  )?.photos;

  const pictureList = pictureEvent?.map((picture) => (
    <PictureCard
      key={picture}
      picture={picture}
      setIsOpen={setIsOpen}
      setFocusPicture={setFocusPicture}
      setOpenFocus={setOpenFocus}
    ></PictureCard>
  ));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file && user) {
      const downloadURL = await uploadPhoto(user.uid, match.params.slug, file);

      await addPictureOnUserEvent(user.uid, match.params.slug, downloadURL);

      const updatedData = await getUserDocument(user.uid);
      if (updatedData) {
        setUserData(updatedData as IUserData);
      }
    }
  }

  async function deletePicture(pictureUrl: string) {
    if (user) {
      await deletePhoto(user?.uid, pictureUrl, match.params.slug);

      const updatedData = await getUserDocument(user.uid);
      if (updatedData) {
        setUserData(updatedData as IUserData);
        setOpenFocus(false);
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Party Memory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <MemberBanner />
        <PictureCardFocus
          picture={focusPicture}
          openFocus={openFocus}
          setOpenFocus={setOpenFocus}
          setAlertIsOpen={setAlertIsOpen}
          setDeletePictureUrl={setDeletePictureUrl}
        />
        <IonList>
          <IonListHeader>
            <div className="add-container">
              <IonButton
                className={showInput ? "add-button hidden" : "add-button"}
                fill="outline"
                onClick={(e: any) => setShowInput(true)}
              >
                Ajouter une photo ?
              </IonButton>
              <form
                onSubmit={handleSubmit}
                className={showInput ? "add-form" : "add-form hidden"}
              >
                <input type="file" name="photo" />
                <IonButton className="add-button" expand="full" type="submit">
                  Ajouter la photo
                </IonButton>
              </form>
            </div>
          </IonListHeader>
          <IonButton id="download-alert">Télécharger</IonButton>
          <IonAlert
            trigger="download-alert"
            header="Téléchargement"
            message="Etes-vous sûr de vouloir récupérer les photos sur cet appareil ?"
            buttons={["OK"]}
          ></IonAlert>
        </IonList>
        <IonList className="gallery-container" lines="none">
          {pictureList}
        </IonList>
        <IonAlert
          className="alert"
          isOpen={alertIsOpen}
          header="ATTENTION"
          subHeader="Voulez-vous vraiment supprimer cette photo ?"
          buttons={[
            { text: "ANNULER", role: "cancel" },
            {
              text: "SUPPRIMER",
              cssClass: "alert-button-danger",
              handler: () => deletePicture(deletePictureUrl),
            },
          ]}
          onDidDismiss={() => setAlertIsOpen(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Party;
