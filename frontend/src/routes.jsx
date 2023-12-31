import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  
} from "@heroicons/react/24/solid";
import CourseEdit from "./pages/neastedPages/Courses/Edit";
import CoursesIndex from "./pages/neastedPages/Courses/Index";
import { Home, Profile, Courses, Homework } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Show from "./pages/neastedPages/Courses/Show";
import NewCourses from "./pages/neastedPages/Courses/New";
import HomeworkIndex from "./pages/neastedPages/Homework/Index";
import NewHomework from "./pages/neastedPages/Homework/New";
import HomeworkEdit from "./pages/neastedPages/Homework/Edit";
import ShowHomework from "./pages/neastedPages/Homework/Show";
import NewStudent from "./pages/neastedPages/Students/New";
import Student from "./pages/neastedPages/Students/Index";
import EditAnswer from "./pages/neastedPages/Homework/EditAnswer";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home/*",
        element: <Home />,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "HomeWork",
        path: "/homework/*",
        element: <Homework />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "Courses",
        path: "/courses/*",
        element: <Courses />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile/*",
        element: <Profile />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    title: "logout",
    layout: "authLogout",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "logout",
        path: "/sign-in/*",
        element: <SignIn />,
      },
      
    ],
  },
  {
    layout: "Courses",
    pages: [
      {
        
        name: "index",
        path: "/",
        isAllow:{
          student:true,
          teacher:true
        },
        element: <CoursesIndex />,
      },
      {
        name: "new",
        path: "/newhomecreate",
        isAllow:{
          student:false,
          teacher:true
        },
        element: <NewCourses />,
      },
      // {
      //   name: "comments",
      //   path: "/comments/:id/edit",
      //   element: <NewCourses />,
      // },
      {
        name: "edit",
        path: "/:id/edit",
        isAllow:{
          student:false,
          teacher:true
        },
        element: <CourseEdit />,
      },
      {
        
        name: "id",
        path: "/:id",
        isAllow:{
          student:true,
          teacher:true
        },
        element: <Show />,
      },
      
    ],
  },{
    layout: "Homework",
    pages: [
      {
        
        name: "index",
        path: "/",
        isAllow:{
          student:true,
          teacher:true
        },
        element: <HomeworkIndex />,
      },
      {
        name: "new",
        path: "/newhomecreate",
        isAllow:{
          student:false,
          teacher:true
        },
        element: <NewHomework />,
      },
      {
        name: "answer",
        path: "/:id/answer/:idd/edit",
        isAllow:{
          student:false,
          teacher:true
        },
        element: <EditAnswer />,
      },
      {
        name: "edit",
        path: "/:id/edit",
        isAllow:{
          student:false,
          teacher:true
        },
        element: <HomeworkEdit />,
      },
      {
        
        name: "id",
        path: "/:id",
        isAllow:{
          student:true,
          teacher:true
        },
        element: <ShowHomework />,
      },
      
    ],
  },{
    layout: "Students",
    pages: [
      {
        
        name: "index",
        path: "/",
        element: <Student />,
      },
      {
        name: "new",
        path: "/newStudent",
        element: <NewStudent />,
      },
      
      // {
      //   name: "edit",
      //   path: "/edit",
      //   element: <CourseEdit />,
      // },
      // {
        
      //   name: "id",
      //   path: "/:id",
      //   element: <Show />,
      // },
      
    ],
  }
];

export default routes;
