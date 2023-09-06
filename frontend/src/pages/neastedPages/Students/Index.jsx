import React, { useEffect, useState } from "react";
import axios from '../../../api'
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  useAccordion,
  

} from "@material-tailwind/react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  
  EllipsisVerticalIcon,
  
} from "@heroicons/react/24/outline";


import {
  
  students,
  
} from "@/data";
import { Link, useNavigate } from "react-router-dom";

export function Student() {
    
    const [Students, setStudents] = useState([])

    const navigate = useNavigate()

    async function getStudents() {
        try {
            console.log('v1.00')
            const response = await axios.get('/api/student', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            setStudents(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])
    async function handleDeleteStudent(id) {
        try {
            await axios.delete(`/api/student/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            navigate('/dashboard/home')
        } catch(err) {
            console.log(err)
        }
    }
    if (students.length==0){
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
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6 flex items-center justify-between">
            <Typography variant="h6" color="white"  className="text-xl">
              Students
            </Typography>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6 text-white"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem> <Link to={"newStudent"}>Add Student</Link>  </MenuItem>
                
                
              </MenuList>
            </Menu>
          </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["names", "email","user-ID"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Students.map(
                ({ img,code, name, email }, key) => {
                  const className = `py-3 px-5 ${
                    key === students.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`https://cdn2.iconfinder.com/data/icons/back-to-school-flat-1/64/14-Graduating_Student-512.png`} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {email}
                      </td>
                      <td className={className}>
                        <div className="flex">
                        {code}
                        <button className="ml-2" onClick={() => {
                              alert("copied")
                              navigator.clipboard.writeText(code);}}>
                                <ContentCopyIcon/>
                              
                        </button>
                        </div>
                      </td>
                      <td className={className} >
                        <Button color="red" variant="text" onClick={()=>{
                            navigate(`/dashboard/home/${code}`)
                            handleDeleteStudent(code)}}>
                          delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
        
        
      
    </div>
  );
}
export default Student;
