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
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userSlice";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Reset: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const auth = getAuth();
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error has occured: ", errorCode, errorMessage);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="reset-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Party Memory</IonCardTitle>
            </IonCardHeader>
            {/*             <IonLoading message="Connexion..." duration={0} isOpen={busy} />
             */}{" "}
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
              <IonButton
                id="open-toast"
                type="submit"
                expand="full"
                onClick={handleReset}
              >
                Réinitialiser
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        {/*         <Toast message={messageToast} isOpen={isOpen} setIsOpen={setIsOpen} />
         */}{" "}
      </IonContent>
    </IonPage>
  );
};

export default Reset;
