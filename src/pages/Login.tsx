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

const Login: React.FC = () => {
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
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Mot de passe"
                  type="password"
                  labelPlacement="floating"
                  required
                ></IonInput>
              </IonItem>
              <IonButton className="forgot-button" fill="clear" expand="full">
                Mot de passe/identifiant oublié
              </IonButton>
              <IonButton expand="full">Connexion</IonButton>
              <IonButton expand="full" fill="clear">
                Inscription
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
