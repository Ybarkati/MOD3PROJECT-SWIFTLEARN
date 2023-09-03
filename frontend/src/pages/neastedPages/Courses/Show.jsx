import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import axios from "../../../api";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";

export function Show({ role }) {
  const params = useParams();

  const [course, setCourse] = useState({});

  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (params.id == "newhomecreate") {
      navigate("/dashboard/courses");
    }
  }, []);
  const { id } = useParams();
  async function getCourse() {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      console.log(response.data);
      setCourse(response.data);
    } catch (err) {
      console.log(err.message);
      navigate("/dashboard/courses");
    }
  }
  async function handleDeleteCourse() {
    try {
        await axios.delete(`/api/courses/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        navigate('/dashboard/courses')
    } catch(err) {
        console.log(err)
    }
  }

  useEffect(() => {
    getCourse();
  }, []);

  const comments = [
    {
      name: "yassine",
      link: `https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`
    },
    {
      name: "yassine",
      link: `https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`
    },
    {
      name: "yassine",
      link: `https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`
    }
  ];
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex w-full ">
            <Link to="/dashboard/courses">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 absolute h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </Link>

            <h1 className="justify-self-center text-2xl text-center w-full ">
              {course.title}
            </h1>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-95% flex flex-col mt-4 mb-4 ml-4 mr-4">
            {role != "student" && (
              <div className="relative h-12 mt-4 mb-4 ml-4 mr-4">
                <button
                  onClick={() => navigate("edit")}
                  type="edit"
                  class="text-white absolute left-24 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteCourse}
                  type="delete"
                  class="text-white absolute left-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            )}
            <div>
              {console.log(course)}
              {course.courseId && (
                <iframe
                  src={`https://836qrl.csb.app/${course.courseId}?showHelp${
                    course.ableDownload == "true" ? "=ok" : ""
                  }`}
                  title="Embedded Content"
                  className="w-[90%] max-w-3xl mt-4 mb-4 ml-4 mr-4 h-[600px]"
                ></iframe>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Show;
