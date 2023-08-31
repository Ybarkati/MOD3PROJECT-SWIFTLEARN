

import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

import routes from "@/routes";
export function Courses() {
  // const navigate=useNavigate()
  // useEffect(()=>{
  // navigate("home")
  // },[])

  return (
    <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "Courses" &&
              pages.map(({ path, element }) => (
                <Route exact  path={path} element={element} />
              ))
          )}
        </Routes>
  );
}

export default Courses;
