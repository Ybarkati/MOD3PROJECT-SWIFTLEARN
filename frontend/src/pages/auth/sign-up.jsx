import { Link } from "react-router-dom";
import axios from "../../api";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
let emptyForm = { 
  username: '',
  password: '',
  email: '',
  role:'',
  code:''
}
export function SignUp({setUser}) {

  const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        
    }
  const handleSelectChange = (event) => {
    setForm({ ...form, role: event,code:"" })
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.role=="student" && form.code==""){
        return alert("each student must have an code")
    }
  
    try {
        const authResponse = await axios.post('/authU/register', form)
        const token = authResponse.data.token

        if (!token) {
            setForm(emptyForm)
            return
        }
        console.log('ok',token)
        localStorage.setItem("token", token)

        const userResponse = await axios.get('/api/users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

        setUser(userResponse.data)
        console.log('ok2')
        if ( form.role=="teacher"){
          navigate('/dashboard/home')
        }else{
          navigate("/dashboard/homework")
        }

    } catch(err) {

        console.log(err)
        alert(err)
        
    }
}
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Username" size="lg" id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username} />
            <Input type="email" label="Email" size="lg"  id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}/>
            <Input type="password" label="Password" size="lg"  id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password} />
            <div className="w-72">
              <Select label="Select your role"    type="text" 
                    id="role"
                    name="role"
                    onChange={handleSelectChange}
                    value={form.role} >
                 <Option value="teacher">I am a teacher</Option>
                 <Option value="student">I am a student</Option>
              </Select> 
            </div>
            {form.role=="student" && <Input label="Your Id Number" size="lg"   type="text" 
                    id="code"
                    name="code"
                    onChange={handleChange}
                    value={form.code}/> }  
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
