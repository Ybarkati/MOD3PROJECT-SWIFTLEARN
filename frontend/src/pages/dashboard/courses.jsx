

import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

import routes from "@/routes";
import CoursesIndex from "../neastedPages/Courses/Index";
import NewCourses from "../neastedPages/Courses/New";
import CourseEdit from "../neastedPages/Courses/Edit";
import Show from "../neastedPages/Courses/Show";

export function Courses({role,user}) {
  const pagesRoutes=[<CoursesIndex role={role}/>,<NewCourses role={role}/>,<CourseEdit user={user} role={role}/>,<Show role={role}/>]
  return (
    
    <Routes>

          {routes.map(
            ({ layout, pages }) =>
              layout === "Courses" &&
              pages.map(({ path,isAllow },index) => (
                isAllow[role] &&
                <Route exact  path={path} element={pagesRoutes[index]} />
              ))
          )}
    </Routes>
  );
}

export default Courses;

// import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

// import routes from "@/routes";
// export function Courses() {
//   // const navigate=useNavigate()
//   // useEffect(()=>{
//   // navigate("home")
//   // },[])

//   return (
//     <Routes>
//           {routes.map(
//             ({ layout, pages }) =>
//               layout === "Courses" &&
//               pages.map(({ path, element }) => (
//                 <Route exact  path={path} element={element} />
//               ))
//           )}
//         </Routes>
//   );
// }

// export default Courses;
