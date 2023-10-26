import { Redirect, Route } from "react-router";
import { useUserContext } from "./context/user";
import React from "react";

export const PrivateRoute: React.FC<{
  component: React.FC<any>;
  path: string;
  exact: boolean;
}> = ({ component: Component, path, exact }) => {
  // Notez la déstructuration ici
  const { isAuthed } = useUserContext();
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthed ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export const PublicRoute: React.FC<{
  component: React.FC<any>;
  path: string;
  exact: boolean;
}> = ({ component: Component, path, exact }) => {
  // Et ici aussi
  const { isAuthed } = useUserContext();
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        !isAuthed ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
