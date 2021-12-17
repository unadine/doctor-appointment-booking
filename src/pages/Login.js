import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth"
import {auth} from '../config/firebaseConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import MainContent from "../components/MainContent";
import {AppointmentContext} from "../Context";


const Login = () => {
    const navigate = useNavigate();
    const { uid} = useContext(AppointmentContext);

    useEffect(()=>{
        console.log(uid)
    })


    

    const [loginEmail,setloginEmail] = useState("");
    const [loginPassword,setloginPassword] = useState("");

    const handlingChange = (e) => {
        if(e.target.name === 'email'){
            setloginEmail(e.target.value);
        }
        if(e.target.name === 'password'){
            setloginPassword(e.target.value);
        }
        

    }
    const signin = async(e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )

                toast("Successfully Login");
                navigate("/");
        } catch(e){
            console.log(e)
            toast(e.message);
           
        }

        setloginEmail("");
        setloginPassword("");

    }

 
    return (
        <>
        <MainContent 
        content={
            <div className="px-16 py-6 bg-gray-100 md:col-span-1">
              <div className="one w-full max-w-md">
              <ToastContainer/>
                   <form className=" px-8 pt-6 pb-8 mb-4" onSubmit={signin}>
                         <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                             email
                        </label>
                         <input onChange={handlingChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="email" id="email" type="text" placeholder="email"/>
                         </div>
                         <div className="mb-6">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                             Password
                         </label>
                         <input onChange={handlingChange} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="******************"/>
                         </div>
                         <div className="flex items-center justify-between">
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                         </button>
                         <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
                         >
                        <Link to="/register"> Create account  </Link>
                            
                         </p>
                         </div>
                     </form>
 </div>

           
            
         </div>
            
        }

        />
     </>


      );

  
  };
export default Login;