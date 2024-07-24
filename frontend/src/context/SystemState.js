import React from 'react'
import SystemContext from './SystemContext'


function SystemState(props) {



    const handleLogin = async(user)=>{
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        
        return data;
    }

    const handleRegister = async(user)=>{
        const response = await fetch('http://localhost:5000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }

    const fetchUsers = async()=>{
        const response = await fetch('http://localhost:5000/api/auth/get-users',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    const updateUser = async(id, user)=>{
        const response = await fetch(`http://localhost:5000/api/auth/update-user/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }

    const changePassword = async(user)=>{
        const response = await fetch('http://localhost:5000/api/auth/change-password',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
    }

    const deleteUser = async(id)=>{
        const response = await fetch(`http://localhost:5000/api/auth/delete-user/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    const addStore = async(store)=>{
        const response = await fetch('http://localhost:5000/api/store/add-store',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store)
        });
        const data = await response.json();
        console.log(data);
    }

    const fetchStore = async()=>{
        const response = await fetch('http://localhost:5000/api/store/get-store',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
        
    }

    const updateStore = async(id, store)=>{
        const response = await fetch(`http://localhost:5000/api/store/update-store/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store)
        });
        const data = await response.json();
        console.log(data);
    }

    const deleteStore = async(id)=>{
        const response = await fetch(`http://localhost:5000/api/store/delete-store/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    const addRating = async(storeId, rating)=>{
        const response = await fetch(`http://localhost:5000/api/rating/add-rating/${storeId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        });
        const data = await response.json();
        console.log(data);
    }


  
  return (
    <SystemContext.Provider value={{fetchStore,fetchUsers,handleLogin,addRating}}>
        {props.children}
    </SystemContext.Provider>
  )
}

export default SystemState