import { Link, useNavigate } from "react-router-dom";
import axios from '../../../api'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
let emptyForm = { 
  userID:'',
  email: '',
  name:''
}
export function NewStudent() {
  const navigate=useNavigate()
  let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit= async (e)=>{
      e.preventDefault()
      try {
        await axios.post(`/api/student`, form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        console.log(form)
        navigate("/dashboard/home")
    } catch(err) {
        console.log(err.message)
    }
    }
    
  return (
    <>
      
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              new student
            </Typography>
            
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="text" label="userID" size="lg" id="userID"
                    name="userID"
                    onChange={handleChange}
                    value={form.userID} 
                    className="uppercase"/>
            <Input type="email" label="email" size="lg" id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email} />
           <Input type="text" label="name" size="lg" id="name"
                    name="name"
                    onChange={handleChange}
                    value={form.name} />
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit} >
              send invite 
            </Button>
            <div className="flex w-full ">
            <button onClick={()=>navigate("/dashboard/home")} type="button" className="bg-white ml-36 rounded-md mt-4 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default NewStudent;