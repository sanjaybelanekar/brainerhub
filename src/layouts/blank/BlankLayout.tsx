import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../../shared/routes/FrontendRoutes";
import PageNotFound from "../../ui/404/PageNotFound";
import Loader from "../../ui/loader/Loader";
import Header from "./Header";
import Login from "../../features/frontend/auth/Login";

interface IBlankLayoutProps {}

const BlankLayout: React.FunctionComponent<IBlankLayoutProps> = (props) => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {Array.isArray(routes) &&
            routes.map((route: any, i) => (
              <Route
                key={route.path + i}
                path={`${route?.path}/*`}
                element={route?.component}
              >
                {Array.isArray(route?.subRoutes) &&
                  route?.subRoutes.map((v: any, i: any) => (
                    <Route
                      path={v.path}
                      element={v.component}
                      key={v.path + i}
                    />
                  ))}
              </Route>
            ))}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default BlankLayout;
