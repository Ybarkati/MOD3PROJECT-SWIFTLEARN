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
  
  export function ShowHomework() {
    
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
  const comments=[{name:"yassine",link:`https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`},
  {name:"yassine",link:`https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`},
  {name:"yassine",link:`https://drive.google.com/file/d/12VvaaPIa703JGVlTZ2P99Wf1s3ocJThW/view?usp=sharing`},
]
    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
        
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white" className="flex w-full ">
                <Link to="/dashboard/homework">
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
            <div className="">
                {comments.map((element)=>{
                    return(
                        <a href={element.link} target="_blank" className="inline-flex ml-4 mr-4  mb-4 items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                              <span className="w-full">Homework for {element.name}</span>
                           <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                              </svg>
                        </a>
                    )
                })}
            </div>
            <details className="group w-[300px] self-center">
				<summary className="flex justify-between items-center font-medium cursor-pointer list-none">
					<span> Submit Your homework here</span>
					<span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                 </svg>
              </span>
				</summary>
				<div className="w-70 mt-6 flex">
                 <div className="relative w-full min-w-[200px]">
                      <textarea
                      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        ></textarea>
                   <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Your Link
                    </label>
                      </div>
                      <button type="submit" class="inline-flex justify-center ml-1 h-fit align-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                              <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                              </svg>
                              <span class="sr-only">Send message</span>
                        </button>
                       </div>
			         </details>
      
             </div>
          </CardBody>
        </Card>
        
      </div>
    );
  }
  
  export default ShowHomework;
  