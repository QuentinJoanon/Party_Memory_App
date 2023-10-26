import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Link, Redirect, Route, Switch } from "react-router-dom";
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
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useEffect, useState } from "react";
import { auth, firebaseConfig } from "./firebaseConfig";
import Reset from "./pages/auth/Reset";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContextProvider, useUserContext } from "./context/user";
import { PrivateRoute, PublicRoute } from "./routerConfig";

setupIonicReact();

const App: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user connected :", user); // ajoutez cette ligne
        setUser(user);
      } else {
        console.log("user disconnected");
        setUser(null);
      }
    });
  }, []);

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <PrivateRoute component={Home} path="/home" exact />
          <PublicRoute component={Login} path="/login" exact />
          <PublicRoute component={Register} path="/register" exact />
          <PublicRoute component={Reset} path="/reset" exact />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default App;
