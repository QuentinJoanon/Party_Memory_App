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
import { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");

  function registerUser() {
    console.log("registerUser", email, password, cPassword);
  }

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
                onIonChange={(e: any) => setEmail(e.target.value)}
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Mot de passe"
                type="password"
                onIonChange={(e: any) => setPassword(e.target.value)}
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Confirmez le mot de passe"
                type="password"
                onIonChange={(e: any) => setCPassword(e.target.value)}
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
        <IonButton
          className="register-button"
          expand="full"
          onClick={registerUser}
        >
          Inscription
        </IonButton>
        <IonButton expand="full" fill="clear">
          <Link to="/login">Vous avez déjà un compte ? Connectez-vous</Link>
        </IonButton>
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
      </IonContent>
    </IonPage>
  );
};

export default Register;
