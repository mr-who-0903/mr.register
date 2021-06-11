import React, {useState ,useEffect, useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';

const Home = () => {

    const {state, dispatch} = useContext(UserContext);
    const [flag, setFlag] = useState(false);

    const callHomePage = async () => {
        try{
            const res = await fetch('/getuser', {
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if(res.status === 401){
                dispatch({type:"USER", payload:false});  // false means session expired
            }
            else{
                setFlag(true);
                dispatch({type:"USER", payload:true});  // true means user is signed in
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])



    return (
        <>
        <div className="home-page"> 
            <div className="home-div">
                <p className="pt-5">WELCOME</p>
                <h2> { flag ? 'Happy to see you back' : 'We Are The MERN Developers'}</h2>
            </div>
            <ToastContainer/>
        </div>
        </>
    )
}

export default Home
