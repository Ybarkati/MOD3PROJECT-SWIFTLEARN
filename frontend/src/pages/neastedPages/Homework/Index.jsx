import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton
} from "@material-tailwind/react";
import { homework } from "@/data";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../../api'

export function HomeworkIndex({ role }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [homework, setHomework] = useState([])
  async function getPosts() {
    try {
        console.log('v1.00')
        const response = await axios.get('/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setHomework(response.data)
        console.log(response.data)
        setIsLoading(false)
    } catch(err) {
        console.log(err)
    }
}

useEffect(() => {
    getPosts()
}, [])
if (isLoading){
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
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6 flex items-center justify-between"
        >
          <Typography variant="h6" color="white" className="text-xl">
            Homework
          </Typography>
          {role != "student" && (
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
                <MenuItem>
                  {" "}
                  <Link to={"newhomecreate"}>Add homework</Link>{" "}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {role == "student" ? (
                  <>
                    {["title", "due"].map((el) => (
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
                    ))}
                  </>
                ) : (
                  <>
                    {["title", "status", "due"].map((el) => (
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
                    ))}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {homework.map(({ Published,due,title,_id }, key) => {
                const className = `py-3 px-5 ${
                  key === homework.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={title}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={`https://cdn-icons-png.flaticon.com/512/5058/5058507.png`} alt={name} size="sm" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold "
                          >
                            {title}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    {role != "student" && (
                      <td className={className}>
                        {console.log(Published)}
                        <Chip
                          variant="gradient"
                          color={Published=="true" ? "green" : "blue-gray"}
                          value={Published=="true" ? "published" : "unpublished"}
                          className="py-0.5 px-2 w-24 text-[11px] text-center font-medium"
                        />
                      </td>
                    )}

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {due}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        <Link to={`${_id}`}>
                          <Button variant="text" color="blue">
                            More ...
                          </Button>
                        </Link>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default HomeworkIndex;
