import React, { useContext, useEffect, useState } from 'react'
import SystemContext from '../context/SystemContext';

function AdminDashboard() {
  const [userList,SetUserList] = useState([])
  const [storeList,SetStoreList] = useState([])
  const {fetchUsers,fetchStore} = useContext(SystemContext);
  
  useEffect(()=>{
    if(storeList.length === 0 || userList.length ===0){
      fetchUsers().then((data)=>{
        SetUserList(data);
      })
  
      fetchStore().then((data)=>{
        SetStoreList(data);
      })
    }
    console.log(storeList);
    console.log(userList);
    
  }
  ,[]);
  return (
    <div className='container my-5'>
        <h1>Admin Dashboard</h1>
        <p>Welcome Admin</p>

        <p>Here you can manage the stores and ratings</p>
        <div>
            <p>total users : {userList.length}</p>

            <p>total stores : {!storeList ? <p>...loading</p>:storeList.length}</p>
            <p>total ratings</p>

        </div>
    </div>
  )
}

export default AdminDashboard