import { Link, useNavigate, useParams } from "react-router-dom";
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
  Textarea
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
let emptyForm = { 
  grade:"",
  feedback: '',
}

export function EditAnswer() {
  const navigate=useNavigate()
  const params=useParams()
  let [form, setForm] = useState(emptyForm)
  let [answer, setAnswer] = useState({})

  async function getAnswer() {
    console.log(params.idd)
    try {
        const response = await axios.get(`/api/comments/${params.idd}`)
        console.log(response.data)
        console.log('here')
        
        setForm(response.data)
    } catch(err) {
        console.log(err)
        navigate(`/dashboard/homework/${params.id}`)
    }
}

useEffect(() => {
    getAnswer()
}, [])
    const handleChange = (e) => {
            if (e.target.name=="grade" && (e.target.value>100 || e.target.value<0)){
                 alert("grade must be between 100-0 ")
            }else{
                setForm({ ...form, [e.target.name]: e.target.value })
            }
            
      
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            
            console.log(params)
            await axios.put(`/api/comments/${params.idd}`, form)
            navigate(`/dashboard/homework/${params.id}`)
        } catch(err) {
            console.log(err)
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
            <Typography variant="h4" color="white">
              give grade to {form!={} && <>{form.user}</>}
            </Typography>
            
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="number" min={0} max={100} label="Add grade" size="lg" id="grade"
                    name="grade"
                    onChange={handleChange}
                    value={form.grade} 
                    />
            <Textarea label="Leave feedback" type="text" id="feedback" name="feedback" onChange={handleChange} value={form.feedback} />
            
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit} >
              Give grade
            </Button>
            <div className="flex w-full ">
            <button onClick={()=>navigate(`/dashboard/homework/${params.id}`)} type="button" className="bg-white ml-36 rounded-md mt-4 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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

export default EditAnswer;