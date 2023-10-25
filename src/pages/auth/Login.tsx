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
// import { signIn } from "../../firebaseConfig";
import Toast from "../../components/Toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginUser } from "../../firebaseConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  /*   
  const dispatch = useDispatch();

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
      setIsOpen(true);
      setBusy(false);
      history.replace("/home");
    } else {
      setMessageToast("Email ou mot de passe incorrect");
      setIsOpen(true);
    }
    setBusy(false);
  } */

  async function handleLogin() {
    setBusy(true);
    const user = await loginUser(email, password);
    if (user && user.emailVerified) {
      setIsOpen(true);
      setMessageToast("Connexion réussie");
      history.replace("/home");
    } else if (user && !user.emailVerified) {
      setMessageToast(
        "Email non vérifié, veuillez consulter votre boîte mail."
      );
      setIsOpen(true);
    } else {
      setMessageToast("Email ou mot de passe incorrect");
      setIsOpen(true);
    }
    setBusy(false);

    /*     signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
        history.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
      }); */
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
