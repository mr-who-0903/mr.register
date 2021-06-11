import React, {useContext} from 'react'
//import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {

    const {state, dispatch} = useContext(UserContext);

    const RenderMenu = () => {
        if(state){
            return(
                <>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home<span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                </>
                )
        }
        else{
            return(
                <>
                    <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin">Sign in</NavLink>
                        </li>
                </>
                )
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                Mr. Register
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <RenderMenu />
                </ul>
            </div>
            </nav>
        </div>
    )
}

export default Navbar
