import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { Home, Profile, Courses, Homework } from "@/pages/dashboard";

import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Dashboard({ setUser, loggedIn,role,user }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const pagesRoutes=[<Home role={role}/>,<Homework user={user} role={role}/>,<Courses user={user} role={role}/>,<Profile role={role}/>]
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      
      <Sidenav
      username={loggedIn} role={role} setUser={setUser}
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "https://i.postimg.cc/8cPzZR0J/Screenshot-2023-09-05-014940.png" : "https://i.postimg.cc/8cPzZR0J/Screenshot-2023-09-05-014940.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar  />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        {role=="student"? <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path ,name},index) => (
                 name!="dashboard" &&
                <Route exact path={path} element={pagesRoutes[index]} />
              ))
          )}
        </Routes>:<Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path },index) => (
                <Route exact path={path} element={pagesRoutes[index]} />
              ))
          )}
          
        </Routes>}
        
        
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
