import {
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
import "./Home.scss";
import { gridOutline, trashOutline } from "ionicons/icons";
import MemberBanner from "../components/MemberBanner";
import { getAuth } from "firebase/auth";
import { app, getCurrentUser } from "../firebaseConfig";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
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
            <IonLabel>Vos événements</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>30 ans Quentin</IonLabel>
            <IonButton slot="end">
              <IonIcon icon={gridOutline}></IonIcon>
            </IonButton>
            <IonButton slot="end" color="danger">
              <IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Baptême Oliver</IonLabel>
            <IonButton slot="end">
              <IonIcon icon={gridOutline}></IonIcon>
            </IonButton>
            <IonButton slot="end" color="danger">
              <IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Mariage Thomas et Mathilde</IonLabel>
            <IonButton slot="end">
              <IonIcon icon={gridOutline}></IonIcon>
            </IonButton>
            <IonButton slot="end" color="danger">
              <IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
