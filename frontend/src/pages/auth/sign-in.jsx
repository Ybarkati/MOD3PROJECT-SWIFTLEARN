import { Link, useNavigate } from "react-router-dom";
import axios from '../../api'
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
  username: '',
  password: '',
  email: ''
}
export function SignIn({setUser}) {
  const navigate=useNavigate()
  let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit= async (e)=>{
      e.preventDefault()

        try {
            const authResponse = await axios.post('/authU/login', form)
            const token = authResponse.data.token
    
            if (!token) {
                setForm(emptyForm)
                return
            }
    
            localStorage.setItem("token", token)
    
            const userResponse = await axios.get('/api/users', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
    
            setUser(userResponse.data)
    
            navigate('/dashboard/homework')

        } catch(err) {

            console.log(err)
            alert(err.response.data.error)

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
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="username" label="Username" size="lg" id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username} />
            <Input type="password" label="Password" size="lg" id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password} />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
