import React, { useContext, useState } from 'react'
import SystemContext from '../context/SystemContext';

function Login() {
  const { handleLogin } = useContext(SystemContext);
  const [user,setUser] = useState({
    email:"",
    password:""
  });

  const onChange = (e)=>{
    const {name ,value} = e.target;
    setUser({...user,[name]:value})
  }

  const handleClick = (e)=>{
    e.preventDefault();
    console.log(user);
    handleLogin(user).then((result)=>{
      if(result.isLogin){
        console.log("Result: ",result);
        localStorage.setItem('token',result.token);
        localStorage.setItem('role',result.role);
        alert("Login Succesfully");
        return;
      }
      alert(result.message);
    });

  }
  return (
    <div className='container'>
        <h1>Login</h1>
        <div>
        <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder="email"
                    />
                    <label htmlFor="floatingInput">Enter Email</label>
                </div>
                <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder='password'
                       
                    />
                    <label htmlFor="floatingInput">Enter Password</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Login
                </button>
        </div>
    </div>
  )
}

export default Login