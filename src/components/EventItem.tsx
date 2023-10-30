import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { gridOutline, trashOutline } from "ionicons/icons";
import { Link } from "react-router-dom";

interface EventItemProps {
  event: { name: string; slug: string; photos: string[] };
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteEventName: React.Dispatch<React.SetStateAction<string>>;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  setIsOpen,
  setDeleteEventName,
}) => {
  return (
    <IonItem>
      <IonLabel>{event.name}</IonLabel>
      <Link to={`/event/${event.slug}`}>
        <IonButton slot="end">
          <IonIcon icon={gridOutline} slot="icon-only"></IonIcon>
        </IonButton>
      </Link>
      <IonButton
        slot="end"
        color="danger"
        onClick={() => {
          setIsOpen(true), setDeleteEventName(event.slug);
        }}
      >
        <IonIcon icon={trashOutline} slot="icon-only"></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default EventItem;
