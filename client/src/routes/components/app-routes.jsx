import React from "react";
import { Routes,Route } from "react-router-dom";
import routes from "../routes-config";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map((route, i) => (
         	<Route
			 path={route.path}
			 key={i}
			 element={
				 <route.component routes={route.routes} />
			 }
		 />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
