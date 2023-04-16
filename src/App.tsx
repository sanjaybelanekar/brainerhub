import React, {
  useState,
  useEffect,
  FunctionComponent,
  ReactComponentElement,
} from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import Secured from "./layouts/secured/Secured";
import { createTheme, ThemeProvider } from "@mui/material";
import "../src/index.css";
import { Toast } from "./ui/toast/Toast";

import { useDispatch, useSelector } from "react-redux";
import UserModel from "./shared/models/userModel";
import { addLoggedUser, selectLoggedUser } from "./app/slices/AuthSlice";
import AuthService from "./services/AuthService";
import PageNotFound from "./ui/404/PageNotFound";
import Header from "./layouts/blank/Header";

interface ProtectedRouteProps {
  children: ReactComponentElement<any>;
}

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins','Roboto',sans-serif",
  },
});
const App = () => {
  const [hasNetworkOffline, setHasNetworkOffline] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentLoggedUser: UserModel = useSelector(selectLoggedUser);
  const token = sessionStorage.getItem("aToken") as string;

  function checkConnections() {
    window.addEventListener("online", () => {
      setHasNetworkOffline(false);
    });
    window.addEventListener("offline", () => {
      setHasNetworkOffline(true);
    });
  }

  let ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
    children,
  }) => {
    return token && currentLoggedUser?._id ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  const destroySession = () => {
    sessionStorage.clear();
    dispatch(addLoggedUser({}));
    navigate("/login");
  };

  useEffect(() => {
    if (currentLoggedUser?._id && !token) {
      destroySession();
    } else if (currentLoggedUser?._id && token) {
      AuthService.validateToken(token)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
          destroySession();
        });
    }
  }, [pathname]);

  useEffect(() => {
    checkConnections();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toast />

        <Header />
        <Routes>
          <Route path="/*" element={<BlankLayout />} />
          <Route
            path="secured/*"
            element={
              <ProtectedRoute>
                <Secured />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
