import { IonAvatar, IonItem, IonLabel, IonList } from "@ionic/react";
import "./MemberBanner.scss";

const MemberBanner: React.FC = () => {
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
          <p>
            Membre <span className="account-type">Premium</span>
          </p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default MemberBanner;
