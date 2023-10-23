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
import { signIn } from "../firebaseConfig";
import Toast from "../components/Toast";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";

const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  async function login() {
    setBusy(true);
    const userCredential = await signIn(email, password);
    console.log(userCredential.email);
    if (userCredential.email) {
      dispatch(
        setUser({
          email: userCredential.email,
        })
      );
      setMessageToast("Connexion réussie");
      setIsOpen(true);
      setBusy(false);
      history.replace("/home");
    } else {
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
                  onIonChange={(e: any) => setEmail(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Mot de passe"
                  type="password"
                  labelPlacement="floating"
                  name="password"
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
        <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
