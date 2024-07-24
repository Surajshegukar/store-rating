import React, { useContext, useEffect, useState } from 'react'
import SystemContext from '../context/SystemContext';


function Store() {
    const {fetchStore} = useContext(SystemContext);
    const [storelist, setStoreList] = useState([]);
    
    
    const [store, setStore] = useState({
        name: "",
        address: "",
    });
    const onChange = (e) => {
        setStore({ ...store, [e.target.name]: e.target.value });
        console.log(store);
    }

    useEffect(()=>{
        fetchStore().then((data)=>{
            setStoreList(data);
        });
    },[]);

  return (
    <div className="container">
        <h1>
            Store
        </h1>
        <div style={{display:"flex",flexDirection:"row",gap:"5px"}} className="container">

        <div style={{width:"200px"}} className="form-floating">
          <input
            name="name"
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={onChange}
            placeholder="Store Name"
          />
          <label htmlFor="floatingInput">Store Name</label>
        </div>
        <div style={{width:"200px"}} className="form-floating">
          <input
            name="address"
            type="text"
            className="form-control"
            id="floatingInput"
            onChange={onChange}
            placeholder="Store Address"
          />
          <label htmlFor="floatingInput">Store Address</label>

        </div>
        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Add Store
        </button>



        </div>
        <div className="container my-5" style={{overflowX:"scroll"}}>
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Store Name</th>
              <th scope="col">Address</th>
              <th scope="col">Rating</th>
              
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                !storelist? <tr><td colSpan="4">No Store Available</td></tr>:
                storelist.map((store,index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{store.name}</td>
                        <td>{store.address}</td>
                        <td>{store.rating}</td>
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

export default Store