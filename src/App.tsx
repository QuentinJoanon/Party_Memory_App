import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./firebaseConfig";
import Dashboard from "./pages/Dashboard";
import { useDispatch } from "react-redux";

setupIonicReact();

const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        window.history.replaceState({}, "", "/home");
      } else {
        window.history.replaceState({}, "", "/login");
      }
      setBusy(false);
    });
  }, []);

  return <IonApp>{busy ? <IonSpinner /> : <RoutingSystem />}</IonApp>;
};

export default App;
