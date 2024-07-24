import React, { useContext, useEffect, useState } from 'react'
import SystemContext from '../context/SystemContext';


function User() {
    const { fetchUsers } = useContext(SystemContext);
    const [userList, setUserList] = useState([]);


    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        role: "user"
    });
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    }

    useEffect(() => {
        fetchUsers().then((data) => {
            setUserList(data);
        });
    }, []);

    return (
        <div className="container">
            <h1>
                User
            </h1>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }} className="container">

                <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder="name"
                    />
                    <label htmlFor="floatingInput">name</label>
                </div>
                <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="password"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder="Store Address"
                    />
                    <label htmlFor="floatingInput">password</label>

                </div>

                <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder="email"
                    />
                    <label htmlFor="floatingInput">email</label>
                </div>
                <div style={{ width: "200px" }} className="form-floating">
                    <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        onChange={onChange}
                        placeholder="address"
                    />
                    <label htmlFor="floatingInput">address</label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add User
                </button>
            </div>
            <div className="container my-5" style={{ overflowX: "scroll" }}>
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !userList ? <tr><td colSpan="4">No Store Available</td></tr> :
                                userList.map((store, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{store.name}</td>
                                        <td>{store.email}</td>
                                        <td>{store.address}</td>
                                        <td>{store.role}</td>
                                        <td>
                                            <button className="btn btn-primary">Edit</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))

                        }
                    </tbody>
                </table>

            </div>
        </div>

    )
}


export default User