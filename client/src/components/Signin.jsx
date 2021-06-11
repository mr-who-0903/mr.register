import React, {useState, useContext} from 'react'
import logo from '../images/signin.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink, useHistory} from 'react-router-dom';
import { UserContext } from '../App';

const Signin = () => {

    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onClickFunc = async (e) =>{
        e.preventDefault();

        const res = await fetch("/login", {

            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email, password
            })
        });
        
        const data = await res.json();
    
        if(res.status === 400 || !data){
            toast.error(data.error, 
            {position: "top-center",
            autoClose: 5000});
        }
        if(res.status === 422 || !data){
            toast.error(data.error, 
            {position: "top-center",
            autoClose: 5000});
        }
        else if(res.status === 200){
            dispatch({type:"USER", payload:true});
            history.push("/");   // redirects to home page 
        }

    }

    return (
        <>

            <div className="container signin">
                <div className="row content">

                    <div className="col-md-6 mb-3 svg-container">
                        <img src={logo} className="img-fluid" alt="logo" className="login-svg"/>
                    </div>

                    <div className="col-md-6">
                        <h3 className="form-heading mb-3">Sign In</h3>
                        <form method="POST" className="sign-form">

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-paper-plane"></i></div>
                                    <input type="email" className="form-control" name="email" 
                                    value={email} onChange={(event) => setEmail(event.target.value)} 
                                    placeholder="Email Address" autoComplete="off"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-lock"></i></div>
                                    <input type="password" className="form-control" name="password" 
                                    value={password} onChange={(event) => setPassword(event.target.value)} 
                                    placeholder="Password" autoComplete="off"/>
                                </div>
                            </div>

                            <div className="form-group-btn">
                                <button type="submit" onClick={onClickFunc} name="signin" className="btn btn-primary btn-block btn-lg">Sign In</button>
                            </div>
                            <ToastContainer/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin
