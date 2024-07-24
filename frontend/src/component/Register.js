import React from 'react'

function Register() {

    

  return (
    <div className='container'>
        <h1>Register</h1>
        <form>
            <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            </div>
            <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" />
            </div>
            <div>
            <label htmlFor="role">Role</label>
            <select name="role" id="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="storeowner">Store Owner</option>
            </select>
            </div>
            <button type="submit" >Register</button>
        </form>
    </div>
  )
}

export default Register