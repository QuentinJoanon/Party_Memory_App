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
import "./Reset.scss";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { signIn } from "../../firebaseConfig";
import Toast from "../../components/Toast";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { resetPassword } from "../../firebaseConfig";

const Reset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [messageToast, setMessageToast] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  async function handleReset() {
    const resetRequest = await resetPassword(email);
    if (resetRequest) {
      setIsOpen(true);
      setMessageToast(
        "Si votre adresse email est valide, vous allez recevoir un email de réinitialisation."
      );
    } else {
      setIsOpen(true);
      setMessageToast("Une erreur est survenue.");
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="reset-container">
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
                  name="email"
                  value={email}
                  onIonInput={(e: any) => setEmail(e.target.value)}
                  required
                ></IonInput>
              </IonItem>
              <IonButton
                id="open-toast"
                type="submit"
                expand="full"
                onClick={handleReset}
              >
                Réinitialiser
              </IonButton>
              <IonButton fill="clear" expand="full">
                <Link to="/login">Revenir à l'écran de connexion</Link>
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
      </IonContent>
    </IonPage>
  );
};

export default Reset;
