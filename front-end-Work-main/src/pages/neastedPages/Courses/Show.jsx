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
  import { homework } from "@/data";
  
import { Link ,useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
  
  export function Show() {
    
    const params=useParams()
    const [inputValue, setInputValue] = useState("");
  const [submit, setSubmit] = useState("1S_nhHD8J5gpd3cHIW42Z2zvraB370Zjm");
  const handleChange = (event) => {
    setInputValue(event.target.value);
    
  };
  function handleSubmit (e){
    e.preventDefault()
    setSubmit(inputValue)
    setInputValue("")
    
  }
  const [isChecked, setIsChecked] = useState(false);
    const navigate=useNavigate()
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="flex w-full ">
                <Link to="/dashboard/courses">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 absolute h-7">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                     </svg>
                </Link>
            
                     
           <h1 className="justify-self-center text-2xl text-center w-full ">{params.id}</h1>
  
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="w-95% flex flex-col mt-4 mb-4 ml-4 mr-4">
             <div className="relative h-12 mt-4 mb-4 ml-4 mr-4" >
             <button onClick={()=>navigate("edit")} type="edit" class="text-white absolute left-24 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
             <button onClick={()=>navigate()} type="delete" class="text-white absolute left-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</button>
             <div className="mt-8 mb-4 ">
             <label className="flex mt-4 mb-4 ml-4 mr-4 relative inline-flex items-center cursor-pointer">
                         <input
                              type="checkbox"
                                className="sr-only peer"  
                            
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                              <div className="w-11 h-6 bg-gray-200    rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                              <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                           {isChecked ? 'published' : 'unpublished'}
                           </span>
                        </label>
                </div>
             </div>
            <div>
                {submit && <iframe
                  src={`https://836qrl.csb.app/${submit}?showHelp${isChecked ? "=ok":""}`}
                   title="Embedded Content"
                  className="w-[90%] max-w-3xl mt-4 mb-4 ml-4 mr-4 h-[600px]"
                 ></iframe> }
            </div>
      
       </div>
          </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default Show;
  