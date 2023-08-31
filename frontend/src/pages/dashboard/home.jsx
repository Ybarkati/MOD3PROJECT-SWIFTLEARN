import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Routes,Route, useNavigate, Navigate } from "react-router-dom";

import routes from "@/routes";
import {
  
  EllipsisVerticalIcon,
  
} from "@heroicons/react/24/outline";


import {
  
  students,
  
} from "@/data";

export function Home() {
  return (
    <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "Students" &&
              pages.map(({ path, element }) => (
                <Route exact  path={path} element={element} />
              ))
          )}
        </Routes>
  );
}

export default Home;
