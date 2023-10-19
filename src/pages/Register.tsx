import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Register.scss";

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informations personnelles</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonInput
                label="Nom"
                type="text"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Prénom"
                type="text"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Email"
                type="email"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Mot de passe"
                type="password"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Confirmez le mot de passe"
                type="password"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Téléphone"
                type="tel"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Adresse</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonInput
                label="Adresse"
                type="text"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Numéro de rue"
                type="number"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Nom de rue"
                type="text"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Complément d'adresse"
                type="text"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Code postal"
                type="number"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Ville"
                type="text"
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Pays"
                type="text"
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonButton className="register-button" expand="full">
          Inscription
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
