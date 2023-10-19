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

const Party: React.FC = () => {
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
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
          <PictureCard picture="https://docs-demo.ionic.io/assets/madison.jpg"></PictureCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Party;
