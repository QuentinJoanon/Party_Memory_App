import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import "./Login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Toast from "../components/Toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setMessageToast("Connexion réussie");
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setMessageToast("Email ou mot de passe incorrect");
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Party Memory</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonInput
                  label="Email"
                  type="email"
                  labelPlacement="floating"
                  onIonChange={(e: any) => setEmail(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Mot de passe"
                  type="password"
                  labelPlacement="floating"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonButton className="forgot-button" fill="clear" expand="full">
                Mot de passe/identifiant oublié
              </IonButton>
              <IonButton
                id="open-toast"
                type="submit"
                expand="full"
                onClick={login}
              >
                Connexion
              </IonButton>
              <IonButton expand="full" fill="clear">
                <Link to="/register">Inscription</Link>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <Toast message={messageToast} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
