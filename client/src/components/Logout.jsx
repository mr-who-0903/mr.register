import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
 
    // using promises
    useEffect(() => {
        
        fetch('/logout', {
            method:"GET",
            headers:{
                Accept: "application/json",    // Accept is the media-type of the response it is expecting.
                "Content-Type": "application/json" // content-type is the media-type of the request being sent from client.
            },
            credentials:"include",
        }).then((res) => {
            dispatch({type:"USER", payload:false});
            history.push('/signin', { replace:true });
            if(res !== 200){
                throw new Error(res.error);
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <>
          <h1></h1>  
        </>
    )
}

export default Logout
