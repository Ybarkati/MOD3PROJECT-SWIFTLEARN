import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
  Form
} from "@material-tailwind/react";
import axios from '../../../api'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";

export function CourseEdit({user}) {
  const [course, setCourse] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()


  async function getCourse() {
      try {
          const response = await axios.get(`/api/courses/${id}`)

          if (response.data.user !== user) {
              throw new Error('User access denied')
          }
          console.log(response.data)
          setCourse(response.data)
      } catch(err) {
          console.log(err.message)
          navigate('/dashboard/course')
      }
  }
  useLayoutEffect(() => {
    getCourse()
    
  }, [])
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [submit, setSubmit] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitleValue(event.target.value);
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(inputValue);
    setInputValue("");
    
  }
  const [isChecked, setIsChecked] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleCheckboxChangePublish = () => {
    setIsPublished(!isPublished);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let courseForm={
      courseId:submit,
      ableDownload:isChecked,
      Published:isPublished,
      title:titleValue,
    }
    console.log(courseForm)
    
        try {
            await axios.put(`/api/courses/${id}`, courseForm, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            navigate(`/dashboard/courses/${id}`)
        } catch(err) {
            console.log(err.message)
        }
  };
  const getInfo=(searchID,title,published,checked,courseId)=>{
    setInputValue(searchID)
    setTitleValue(title)
    if (published=="true"){
      setIsPublished(true)
    }else{
      setIsPublished(false)
    }
    if (checked=="true"){
      setIsChecked(true)
    }else{
      setIsChecked(false)
    }

    setSubmit(courseId)
    
  }
  useEffect(()=>{
    getInfo(course.courseId,course.title,course.Published,course.ableDownload,course.due,course.courseId)
  },[course.title])
  if (!course.title){
    return (
     <div className='flex items-center justify-center min-h-screen'>
           <div style={{borderTopColor:"transparent"}} className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
           <p className="ml-2">Loading...</p>
     </div>
    )
 }

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
              Edit for {course.title}
            </h1>
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-95% flex flex-col mt-4 mb-4 ml-4 mr-4">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                for="search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                
                <input
                  value={inputValue}
                  onChange={handleChange}
                  type="search"
                  id="search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
              

              <button
                type="submit"
                class="text-white mt-4 self-center w-[80px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </form>

            {submit && (
              <div className="flex flex-col gap-4 relative mt-4 mb-4 ml-4 mr-4">
                <label className="flex mt-4 mb-4 ml-4 mr-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div className="w-11 h-6 bg-gray-200    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isChecked ? "able to download" : "not able to download"}
                  </span>
                </label>
                <label className="flex  mb-4 ml-4 mr-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isPublished}
                    onChange={handleCheckboxChangePublish}
                  />
                  <div className="w-11 h-6 bg-gray-200    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isPublished ? "published" : "unpublished"}
                  </span>
                </label>

                

                <Input
                 
                  value={titleValue}
                  onChange={handleChangeTitle}
                  type="text"
                  id="Title"
                  label="Enter the title"
                />
                <button
                  type="submit"
                  onClick={handleSubmitForm}
                  class="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit
                </button>
              </div>
            )}
            <div>
              {submit && (
                <iframe
                  src={`https://836qrl.csb.app/${submit}?showHelp${
                    isChecked ? "=ok" : ""
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

export default CourseEdit;
