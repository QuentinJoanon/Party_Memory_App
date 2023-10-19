import React from "react";
import { IonToast } from "@ionic/react";

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <IonToast trigger="open-toast" message={message} duration={5000}></IonToast>
  );
};

export default Toast;
