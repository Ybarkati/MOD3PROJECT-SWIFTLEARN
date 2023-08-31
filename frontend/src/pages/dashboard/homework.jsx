

import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

import routes from "@/routes";
export function Homework() {
  
  return (
    <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "Homework" &&
              pages.map(({ path, element }) => (
                <Route exact  path={path} element={element} />
              ))
          )}
        </Routes>
  );
}

export default Homework;
