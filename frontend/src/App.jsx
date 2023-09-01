import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from './api'

function App() {
  
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate=useNavigate()
  async function getUser() {
    
    try {
      
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } 
      })
      console.log(response)
      setUser(response.data)
    } catch(err) {
      console.log(err)
      localStorage.removeItem("token")
    }
    setIsLoading(false)
}

  useEffect(() => {
    
      let token = localStorage.getItem("token")

      if (token) {
          getUser()
      } else {
          setIsLoading(false)
      } 

  }, [])
  useLayoutEffect(() => {
    
    if (loggedIn){
        navigate("/dashboard/courses")
    }else{
        navigate("/auth/sign-in")
    }

}, [])
  let loggedIn = user.username
  return (
    <Routes>
      {loggedIn? <>
        <Route path="/dashboard/*" element={<Dashboard user={loggedIn} setUser={setUser}/>} />

      </>:<>
      <Route path="/auth/*" element={<Auth setUser={setUser} />} />
      </>}
      <Route path="*" element={<Navigate to={loggedIn? "/dashboard/courses":'/auth/sign-in'} />} />
    </Routes>
  );
}

export default App;
