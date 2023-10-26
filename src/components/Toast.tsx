import React from "react";
import { IonToast } from "@ionic/react";

export interface ToastProps {
  message: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Toast: React.FC<ToastProps> = ({ message, isOpen, setIsOpen }) => {
  return (
    <IonToast
      isOpen={isOpen}
      message={message}
      duration={3000}
      onDidDismiss={() => setIsOpen(false)}
    ></IonToast>
  );
};

export default Toast;
