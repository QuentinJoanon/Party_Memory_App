import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
} from "@ionic/react";
import "./Login.scss";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../../components/Toast";
import { loginUser } from "../../firebaseConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();

  async function handleLogin() {
    setBusy(true);
    const user = await loginUser(email, password);
    if (user && user.emailVerified) {
      console.log("user from login 1 :", user);
      setIsOpen(true);
      setMessageToast("Connexion réussie");
      history.replace("/home");
    } else if (user && !user.emailVerified) {
      console.log("user from login 2 :", user.emailVerified);
      setMessageToast(
        "Email non vérifié, veuillez consulter votre boîte mail."
      );
      setIsOpen(true);
    } else {
      console.log("user from login 3 :", user);
      setMessageToast("Email ou mot de passe incorrect");
      setIsOpen(true);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Party Memory</IonCardTitle>
            </IonCardHeader>
            <IonLoading message="Connexion..." duration={0} isOpen={busy} />
            <IonCardContent>
              <IonItem>
                <IonInput
                  label="Email"
                  type="email"
                  labelPlacement="floating"
                  name="email"
                  value={email}
                  onIonInput={(e: any) => setEmail(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Mot de passe"
                  type="password"
                  labelPlacement="floating"
                  value={password}
                  name="password"
                  onIonInput={(e: any) => setPassword(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonButton className="forgot-button" fill="clear" expand="full">
                <Link to="/reset">Mot de passe/identifiant oublié</Link>
              </IonButton>
              <IonButton
                id="open-toast"
                type="submit"
                expand="full"
                onClick={handleLogin}
              >
                Connexion
              </IonButton>
              <IonButton expand="full" fill="clear">
                <Link to="/register">Inscription</Link>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
