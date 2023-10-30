import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
import { useUserContext } from "../context/user";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { getCurrentEvent } from "../firebaseConfig";

interface PartyPageProps
  extends RouteComponentProps<{
    slug: string;
  }> {}

const Party: React.FC<PartyPageProps> = ({ match }) => {
  const { user, userData, setUserData } = useUserContext();

  const pictureEvent = userData?.events.find(
    (event) => event.slug === match.params.slug
  )?.photos;

  const pictureList = pictureEvent?.map((picture) => (
    <PictureCard key={picture} picture={picture}></PictureCard>
  ));

  /*   useEffect(() => {
    if (user !== null) {
      const await getCurrentEvent(user?.uid, match.params.slug);
    }
  }, []); */

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
        <IonList>
          <IonListHeader>
            <IonLabel>Nom de l'évenement</IonLabel>
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
      </IonContent>
    </IonPage>
  );
};

export default Party;
