import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { gridOutline, trashOutline } from "ionicons/icons";

interface EventItemProps {
  event: string;
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
      <IonLabel>{event}</IonLabel>
      <IonButton slot="end">
        <IonIcon icon={gridOutline} slot="icon-only"></IonIcon>
      </IonButton>
      <IonButton
        slot="end"
        color="danger"
        onClick={() => {
          setIsOpen(true), setDeleteEventName(event);
        }}
      >
        <IonIcon icon={trashOutline} slot="icon-only"></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default EventItem;
