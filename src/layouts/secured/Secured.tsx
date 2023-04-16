import React, { Suspense } from "react";
import Grid from "@mui/material/Grid";
import routes from "../../shared/routes/AdminRoutes";
import { styled } from "@mui/material/styles";
import { NavLink as NLink, Route, Routes } from "react-router-dom";
import Loader from "../../ui/loader/Loader";

interface ISecuredProps {}

const NavLink = styled(NLink)({
  textDecoration: "none",
  marginRight: "30px",
});

const Secured: React.FunctionComponent<ISecuredProps> = (props) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map((route, i) => (
              <Route
                key={route?.path}
                path={`${route?.path}/*`}
                element={route?.component}
              />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default Secured;
