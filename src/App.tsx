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
import { firebaseConfig } from "./firebaseConfig";
import Dashboard from "./pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Reset from "./pages/auth/Reset";
import Secret from "./pages/protected/ProtectedRoute";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./redux/slice/authSlice";
import ProtectedRoute from "./pages/protected/ProtectedRoute";

setupIonicReact();

const App: React.FC = () => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  // const user = useSelector((state) => state.auth);
  const isAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user", user);
    } else {
      return false;
    }
  });
  console.log("isAuth", isAuth);
  // console.log("user from state", user);
  const dispatch = useDispatch();
  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            saveUser({
              email: user.email,
              accessToken: user.stsTokenManager.accessToken,
              refreshToken: user.stsTokenManager.refreshToken,
            })
          );
        } else {
          dispatch(saveUser(undefined));
        }
      });
    },
    [
      /* auth, dispatch */
    ]
  );

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          {/*           <Route
            exact
            path="/login"
            render={(props) => {
              return isAuth ? <Home {...props} /> : <Login />;
            }}
          /> */}
          <Route path="/reset" exact component={Reset} />
          <Redirect exact from="/" to="/login" />
          <ProtectedRoute path="/home" exact component={Home} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default App;

/* const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/reset" exact component={Reset} />
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

export default App; */
