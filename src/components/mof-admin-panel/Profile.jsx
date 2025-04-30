import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Profile() {
  const [users,setUsers] = useState([]);
  const fetchUsers = async()=>{
    const response = await axios.get(`http://192.168.1.84:8080/ministry-panel/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        console.log("users details--->",response.data);
        setUsers(response.data);
  }
  useEffect(()=>{
    fetchUsers();
  },[])
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6'>
      <h1 className='p-2 rounded-md text-center text-2xl bg-slate-400'>Assign Roles</h1>
      {users.length>0 ?(
        users.map((user) => (
          <div key={user.userId} className='rounded-md shadow-md p-2'>
            <h2>{user.name}</h2>
          </div>
        ))
      ):(
        <p>No User Found...</p>
      )
      }
    </div>
    </>
  )
}
