import { IonAvatar, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import "./MemberBanner.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/userSlice";
import { RootState } from "../store/store";
import { logoutUser } from "../firebaseConfig";
import { useHistory } from "react-router";

const MemberBanner: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.user.email);
  const dispatch = useDispatch();
  console.log(userEmail);
  const history = useHistory();

  async function logout() {
    await logoutUser();
    history.replace("/login");
  }

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
          {/*  <p>{userEmail}</p> */}
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
