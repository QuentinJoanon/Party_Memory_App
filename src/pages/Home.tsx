import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.scss";
import MemberBanner from "../components/MemberBanner";
import {
  addEventOnUserDocument,
  app,
  deleteEventOnUserDocument,
  getUserDocument,
} from "../firebaseConfig";
import { FormEvent, useEffect, useState } from "react";
import { IUserData, useUserContext } from "../context/user";
import EventItem from "../components/EventItem";
import Toast from "../components/Toast";

const Home: React.FC = () => {
  const { user, userData, setUserData } = useUserContext();
  const [eventName, setEventName] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteEventName, setDeleteEventName] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpenToast, setIsOpenToast] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent) {
    setBusy(true);
    e.preventDefault();
    if (user !== null) {
      await addEventOnUserDocument(user.uid, eventName);
      const updatedData = await getUserDocument(user.uid);
      if (updatedData) {
        setUserData(updatedData as IUserData);
        setIsOpenToast(true);
        setMessageToast("Evènement ajouté avec succès !");
      }
    }
    setBusy(false);
  }

  async function deleteEvent(event: string) {
    if (user !== null) {
      await deleteEventOnUserDocument(user?.uid as string, event);
      const updatedData = await getUserDocument(user.uid);
      if (updatedData) {
        setUserData(updatedData as IUserData);
      }
    }
  }

  const eventList = userData?.events.map((event) => (
    <EventItem
      key={event.name}
      event={event}
      setIsOpen={setIsOpen}
      setDeleteEventName={setDeleteEventName}
    />
  ));

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
        <IonLoading message="Connexion..." duration={0} isOpen={busy} />
        <MemberBanner />
        <div className="add-container">
          <IonButton
            className={showInput ? "add-button hidden" : "add-button"}
            fill="outline"
            onClick={(e: any) => setShowInput(true)}
          >
            Ajouter un évènement
          </IonButton>
          <form
            onSubmit={handleSubmit}
            className={showInput ? "add-form" : "add-form hidden"}
          >
            <IonInput
              className="add-input"
              label="Nom de l'évènement"
              type="text"
              value={eventName}
              onIonInput={(e: any) => setEventName(e.target.value)}
              labelPlacement="floating"
              fill="outline"
              required
            ></IonInput>
            <IonButton className="add-button" expand="full" type="submit">
              Ajouter
            </IonButton>
          </form>
        </div>
        <IonList>
          <IonListHeader>
            <IonLabel>
              <h2>Vos évènements</h2>
            </IonLabel>
          </IonListHeader>
          {eventList}
        </IonList>
        <IonAlert
          className="alert"
          isOpen={isOpen}
          header="ATTENTION"
          subHeader="Voulez-vous vraiment supprimer cet évènement ainsi que toutes les photos qui lui sont associées ?"
          buttons={[
            { text: "ANNULER", role: "cancel" },
            {
              text: "SUPPRIMER",
              cssClass: "alert-button-danger",
              handler: () => deleteEvent(deleteEventName),
            },
          ]}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
        <Toast
          message={messageToast}
          isOpen={isOpenToast}
          setIsOpen={setIsOpenToast}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
