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
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Register.scss";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../../components/Toast";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { registerUser } from "../../firebaseConfig";
// import { firebaseConfig, signUp } from "../../firebaseConfig";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();

  /*   

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function registerUser() {

    if (password !== cPassword && password !== "" && cPassword !== "") {
      setMessageToast("Les mots de passe ne correspondent pas");
      setIsOpen(true);
    }
    if (email === "" || password === "" || cPassword === "") {
      setMessageToast("Veuillez remplir tous les champs");
      setIsOpen(true);
    }
    const userCredential = await signUp(email, password);
    console.log(userCredential);
    if (userCredential === true) {
      setMessageToast("Inscription réussie");
      setIsOpen(true);
    } else {
      setMessageToast("Veuillez réessayer");
      setIsOpen(true);
    }

  } */

  async function handleRegister() {
    if (password !== cPassword && password !== "" && cPassword !== "") {
      setMessageToast("Les mots de passe ne correspondent pas");
      setIsOpen(true);
    } else if (email === "" || password === "" || cPassword === "") {
      setMessageToast("Veuillez remplir tous les champs");
      setIsOpen(true);
    } else {
      setBusy(true);
      const userCredential = await registerUser(email, password);
      if (userCredential === true) {
        setMessageToast("Inscription réussie");
        setIsOpen(true);
        history.replace("/login");
      } else {
        setMessageToast("Veuillez réessayer");
        setIsOpen(true);
      }
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        message="Inscription en cours..."
        duration={0}
        isOpen={busy}
      />
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
                value={email}
                onIonInput={(e: any) => setEmail(e.target.value)}
                labelPlacement="floating"
                required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Mot de passe"
                type="password"
                value={password}
                onIonInput={(e: any) => setPassword(e.target.value)}
                labelPlacement="floating"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Confirmez le mot de passe"
                type="password"
                value={cPassword}
                onIonInput={(e: any) => setCPassword(e.target.value)}
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
          onClick={handleRegister}
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
        <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Register;