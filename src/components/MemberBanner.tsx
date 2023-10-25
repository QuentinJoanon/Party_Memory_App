import { IonAvatar, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import "./MemberBanner.scss";
// import { logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { logoutUser } from "../firebaseConfig";
import { useUserContext } from "../context/user";

const MemberBanner: React.FC = () => {
  const { user } = useUserContext();
  const history = useHistory();
  function logout() {
    logoutUser();
    history.replace("/login");
  }
  console.log("User in MemberBanner:", user); // ajoutez cette ligne

  return (
    <IonList className="member-container" lines="none">
      <IonItem>
        <IonAvatar slot="start">
          <img
            src="https://doodleipsum.com/700x700/avatar?i=c2a46927c51b9a0707dcd491590fe419"
            alt="avatar"
          />
        </IonAvatar>
        <IonLabel>
          <h1>Quentin Joanon</h1>
          <p>{user?.email}</p>
          <p>
            Membre <span className="account-type">Premium</span>
          </p>
        </IonLabel>
        <IonButton slot="end" fill="clear" color="danger" onClick={logout}>
          Déconnexion
        </IonButton>
      </IonItem>
    </IonList>
  );
};

export default MemberBanner;
