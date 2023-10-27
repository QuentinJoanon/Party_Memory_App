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
import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../../components/Toast";
import { registerUser } from "../../firebaseConfig";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    console.log("register");
    if (password !== cPassword && password !== "" && cPassword !== "") {
      setMessageToast("Les mots de passe ne correspondent pas");
      setIsOpen(true);
    } else if (email === "" || password === "" || cPassword === "") {
      setMessageToast("Veuillez remplir tous les champs");
      setIsOpen(true);
    } else {
      setBusy(true);
      const userCredential = await registerUser(
        email,
        password,
        firstName,
        lastName
      );
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
        <form onSubmit={handleRegister}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Informations personnelles</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonInput
                  label="Nom"
                  type="text"
                  value={lastName}
                  onIonInput={(e: any) => setLastName(e.target.value)}
                  labelPlacement="floating"
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Prénom"
                  type="text"
                  value={firstName}
                  onIonInput={(e: any) => setFirstName(e.target.value)}
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
            </IonCardContent>
          </IonCard>
          <IonButton className="register-button" expand="full" type="submit">
            Inscription
          </IonButton>
        </form>
        <IonButton expand="full" fill="clear">
          <Link to="/login">Vous avez déjà un compte ? Connectez-vous</Link>
        </IonButton>
        <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
