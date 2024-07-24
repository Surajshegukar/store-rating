
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  const [isLogin,setIsLogin]= useState(false);
  
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLogin(false);
    alert("Logout Successfully");
  }

  useEffect(() => {
    let token = localStorage.getItem('token');
    token ? setIsLogin(true) : setIsLogin(false);
    
  }, [])
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand my-auto" to="/"><strong>Store Rating</strong></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
       
        <Link to = "/" className="nav-link active my-auto" aria-current="page" >Dashboard</Link>
        <Link to = "/about" className="nav-link my-auto" >About</Link>
        <div className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle my-1" to="/manage" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <div><Link className="dropdown-item" to="/admin/user">User</Link></div>
            <div><Link className="dropdown-item" to="/admin/store">Store</Link></div>
            
          </div>
        </div>
        {isLogin ?
        <div><button className="nav-link bg-danger mx-2 p-2 my-1" style={{cursor: "pointer",borderRadius:"5px"}} onClick={handleLogOut} >Logout</button></div>
        :
        <>
          <div><Link to = "/login" className="nav-link bg-light mx-2 p-2 my-1" style={{borderRadius:"5px"}} >Login</Link></div>
          <div><Link to = "/register" className="nav-link bg-light mx-2 p-2 my-1" style={{borderRadius:"5px"}} >Register</Link></div>
        </>
          
          
          }
       
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar