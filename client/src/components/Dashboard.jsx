import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Spinner } from 'react-bootstrap';
import ReactSpinner from 'react-bootstrap-spinner';
import "bootstrap/dist/css/bootstrap.min.css";

import logo from '../images/signup.svg';
import { UserContext } from '../App';

const Dashboard = () => {

    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
    const [userdata, setUserdata] = useState({
        name:"", email:"", ph:"", address:""
    });

    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    const onChangeFunc = (event) =>{
        const {name, value} = event.target;
        setUserdata({...userdata, [name]:value});
    }

    const postData = async (e) =>{
        e.preventDefault();
    
        const { name, email, ph, address } = userdata;
    
        const res = await fetch("/sendData", {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, ph, address
            })
        });

        const data = await res.json();

        if(res.status === 422 || res.status === 401 || !data){
            toast.error(data.error, 
            {position: "top-center",
            autoClose: 5000});
            if(res.status === 401){
                dispatch({type:"USER", payload:false});  // false means session expired
            }
        }
        else if(res.status === 201){
            toast.success(data.message, 
                {position: "top-center",
                autoClose: 5000});

            setUserdata({name:"", email:"", ph:"", address:""});
        }
    }


    const callDashboard = async () => {
        try{
            const res = await fetch('/dashboard', {
                method:"GET",
                headers:{
                    Accept: "application/json",    // Accept is the media-type of the response it is expecting.
                    "Content-Type": "application/json" // content-type is the media-type of the request being sent from client.
                },
                credentials:"include",
            });

            const data = await res.json();
            console.log(data);

            if(res.status === 401){
                toast.error(data.error, 
                    {position: "top-center",
                    autoClose: 5000});
                dispatch({type:"USER", payload:false});  // false means session expired
                throw new Error(res.error);
            }
        }
        catch(err){
            console.log(err);
            history.push('/signin');
        }
    }


    //  GETTING DATA FOR TABLE
    const getData = async() =>{
        try{
                const res = await fetch('/getdata', {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    },
                });

                const data = await res.json();
                if(res.status === 401){
                    toast.error(data.error, 
                        {position: "top-center",
                        autoClose: 5000});
                    dispatch({type:"USER", payload:false});  // false means session expired
                }
                else{
                    setAlldata(data);
                    setLoading(true);  // loading is completed
                    setReload(false);
                    console.log(data.length); 
                    console.log(data);
                }
        }
        catch(e){
            console.log("getData err : "+e);
        }
    }

    const handleDelete = async(rowId) =>{
        console.log("you clicked "+rowId);
        
        try{
            const res = await fetch('/delete', {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    "_id" : rowId
                })
            });

            const data = await res.json();
            console.log("deleted: "+res.status);

            if(res.status === 200){
                console.log("yeeeep");
                toast.success(data.message, 
                    {position: "top-center",
                    autoClose: 5000});
                setReload(true);
            }
            else if (res.status === 401){
                toast.error(data.error, 
                    {position: "top-center",
                    autoClose: 5000});
                dispatch({type:"USER", payload:false});  // false means session expired
            }
        }
        catch(e){
            console.log(e);
        }

    }

    useEffect(() => {
        callDashboard();
       // getData();
    }, [])

    useEffect(() =>{
        getData();
    }, [reload]);


    const columns = [
        { dataField:"name", text:"Username" },
        { dataField:"email", text:"Email" },
        { dataField:"ph", text:"Phone no." },
        { dataField:"address", text:"Address" },
        { text:"Delete", formatter: (cellContent, row) =>{
                return(
                    <button className="btn btn-danger"
                    onClick={() => handleDelete(row._id)}>
                        Delete
                    </button>
                );
        }}
    ]

    return (
        <>
            <div className="container">

                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item tab-menu">
                        <a className="nav-link active" id="form-tab" data-toggle="tab" href="#theform" role="tab">Form</a>
                    </li>
                    <li className="nav-item tab-menu">
                        <a className="nav-link" id="table-tab" data-toggle="tab" href="#table" role="tab" onClick={getData}>Table</a>
                    </li>
                </ul>

                    <div className="tab-content" id="myTabContent">

                        <div className="tab-pane fade show active" id="theform" role="tabpanel" aria-labelledby="form-tab">
                        <div className="container signup">
                                <div className="row content">   

                                    <div className="col-md-6">	
                                        <h3 className="form-heading mb-3">Enter data</h3>    
                                            <form method="POST" className="sign-form">

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                                    <input type="text" className="form-control" name="name" placeholder="Username" 
                                                    autoComplete="off" value={userdata.name} onChange={onChangeFunc}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fa fa-paper-plane"></i></div>
                                                    <input type="email" className="form-control" name="email" placeholder="Email Address" 
                                                    autoComplete="off" value={userdata.email} onChange={onChangeFunc}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fa fa-phone"></i></div>
                                                    <input type="text" className="form-control" name="ph" placeholder="Phone number" 
                                                    autoComplete="off" value={userdata.ph} onChange={onChangeFunc}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-addon"><i className="fa fa-map-marker"></i></div>
                                                    <input type="text" className="form-control" name="address" placeholder="Address" 
                                                    autoComplete="off" value={userdata.address} onChange={onChangeFunc}/>
                                                </div>
                                            </div>

                                            <div className="form-group-btn">
                                                <button type="submit" onClick={postData} name="signin" className="btn btn-primary btn-block btn-lg">Register</button>
                                            </div>
                                
                                            </form>
                                            </div>

                                            <div className="col-md-6 mb-3 svg-container">
                                                <img src={logo} className="img-fluid" alt="logo" className="login-svg"/>
                                            </div>
                                    </div>
                            </div>
                        </div> {/* end of theform */}

                        <div className="tab-pane fade" id="table" role="tabpanel" aria-labelledby="table-tab">
                        {loading ? 
                        <BootstrapTable 
                            keyField="email"
                            data={alldata}
                            columns={columns}
                            pagination={paginationFactory()}
                        />
                        :
                            <div style={{textAlign: 'center' }}>
                                <ReactSpinner type="border" color="primary" size="3"/>
                            </div>
                        }
                        {alldata.length == 0 ? <div className="noDataMsg"><h5>No data in the table</h5></div> : null}
                        </div>

                    </div> {/* end of tab-content */}
                    <ToastContainer/>
            </div>  {/*  end of container */}
        </>
    )
}

export default Dashboard
