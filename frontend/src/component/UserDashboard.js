import React, { useContext, useEffect, useState } from 'react'
import SystemContext from '../context/SystemContext';


function UserDashboard() {
    const { fetchStore,addrating } = useContext(SystemContext);
    const [storeList, setStoreList] = useState()


    const [search, setSearch] = useState(false);
    const [filter, setFilter] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editStore, setEditStore] = useState();
    const onSearch = (e) => {
        setSearch(true);
        const newlist = storeList.filter((store) => store.name.toLowerCase().includes(e.target.value.toLowerCase()) || store.address.toLowerCase().includes(e.target.value.toLowerCase()));
        setStoreList(newlist);
        if (e.target.value === "") {
            setSearch(false);
        }
    }
    const handleEdit =  (store) => {
        setIsModalOpen(true);
        setEditStore(store);

    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        addrating(editStore._id, editStore.rating);

    }

    const onFilter = (e) => {

        console.log(e.target.value);
        if (e.target.value === "a-rating") {
            const newlist = storeList.sort((a, b) => overallrating(a) - overallrating(b));
            setStoreList(newlist);
            console.log(newlist);
            setFilter(!filter);

        }
        if (e.target.value === "d-rating") {
            const newlist = storeList.sort((a, b) => overallrating(b) - overallrating(a));
            setStoreList(newlist);
            console.log(newlist);
            setFilter(!filter);

        }
        if (e.target.value === "a-name") {
            const newlist = storeList.sort((a, b) => a.name.localeCompare(b.name));
            setStoreList(newlist);
            console.log(newlist);
            setFilter(!filter);

        }
        if (e.target.value === "d-name") {
            const newlist = storeList.sort((a, b) => b.name.localeCompare(a.name));
            setStoreList(newlist);
            console.log(newlist);
            setFilter(!filter);

        }
        if (e.target.value === "") {
            setFilter(!filter);

        }
    }

    const overallrating = (store) => {
        let sum = 0;
        store.ratings.map((rating) => {
            sum += rating.rating;
        });
        const rating = sum / store.ratings.length;
        if (isNaN(rating)) {
            return 0;
        }
        return rating;
    }
    const handleEditChange = (e) => {
        e.focus();
        setEditStore({ ...editStore, rating: e.target.value });
        

    }



    useEffect(() => {
        fetchStore().then((data) => {
            setStoreList(data);
        });
    }, [search]);

    useEffect(() => {
        storeList && setStoreList(storeList);
    }, [filter]);


    return (
        <div className="container">
            <div style={{ width: "500px", display: 'flex', gap: "10px" }} className=" my-5">
                <label className='my-2' htmlFor="floatingInput">Search</label>
                <input
                    name="search"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    onChange={onSearch}
                    placeholder="Search Here"
                />


            </div>
            <div style={{ display: 'flex' }} className="my-2">
                <label className='my-2' htmlFor="floatingInput">Filters</label>
                <select style={{ width: "250px" }} className="form-control mx-2"
                    id="floatingInput" name="filter" onChange={onFilter}>
                    <option value="">Select Filter</option>
                    <option value="a-name">Name in acending order </option>
                    <option value="d-name">Name in decending order </option>
                    <option value="a-rating">Rating in acending order </option>
                    <option value="d-rating">Rating in decending order </option>

                </select>
            </div>
            {isModalOpen && <div style={{position:'relative'}} class="modal-body">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Rating</h5>
                        <button type="button" onClick={()=>setIsModalOpen(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-dialog modal-sm">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label
                                    ">Rating</label>
                                <input type="number" onChange={handleEditChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={editStore.rating} />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>


            </div>}
            <div className="container my-5" style={{ overflowX: "scroll" }}>
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Store Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Overall Rating</th>
                            <th scope="col">My Rating</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !storeList ? <tr><td colSpan="5">No Data</td></tr> :
                                storeList.map((store, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{store.name}</td>
                                        <td>{store.address}</td>
                                        <td>{overallrating(store)}</td>
                                        <td>{store.rating}</td>
                                        <td>
                                            <button onClick={() => handleEdit(store)} className="btn btn-primary">Edit</button>
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

export default UserDashboard