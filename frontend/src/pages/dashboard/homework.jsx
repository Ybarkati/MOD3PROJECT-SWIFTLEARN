

import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

import routes from "@/routes";
import HomeworkIndex from "../neastedPages/Homework/Index";
import NewHomework from "../neastedPages/Homework/New";
import HomeworkEdit from "../neastedPages/Homework/Edit";
import ShowHomework from "../neastedPages/Homework/Show";
export function Homework({role}) {
  const pagesRoutes=[<HomeworkIndex role={role}/>,<NewHomework role={role}/>,<HomeworkEdit role={role}/>,<ShowHomework role={role}/>]
  return (
    
    <Routes>

          {routes.map(
            ({ layout, pages }) =>
              layout === "Homework" &&
              pages.map(({ path,isAllow },index) => (
                isAllow[role] &&
                <Route exact  path={path} element={pagesRoutes[index]} />
              ))
          )}
    </Routes>
  );
}

export default Homework;
