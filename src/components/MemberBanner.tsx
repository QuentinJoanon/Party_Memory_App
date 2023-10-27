import { IonAvatar, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import "./MemberBanner.scss";
// import { logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { getUserDocument, logoutUser } from "../firebaseConfig";
import { useUserContext } from "../context/user";
import { useEffect, useState } from "react";

const MemberBanner: React.FC = () => {
  const { user, userData } = useUserContext();
  const history = useHistory();

  function logout() {
    logoutUser();
    history.replace("/login");
  }

  return (
    <IonList className="member-container" lines="none">
      <IonItem>
        <IonAvatar slot="start">
          <img src="https://doodleipsum.com/200x200/avatar" alt="avatar" />
        </IonAvatar>
        <IonLabel>
          <h1>
            {userData?.firstName} {userData?.lastName}
          </h1>
          <p>
            Membre{" "}
            <span className="account-type">{userData?.subscriptionLevel}</span>
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
