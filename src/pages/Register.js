import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainContent from "../components/MainContent";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { usersCollectionRef, auth } from "../config/firebaseConfig";
import {addDoc} from "firebase/firestore";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs"

const Register = () => {
    const navigate = useNavigate()


    const [name,setName] = useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    
    
    const handlingChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value);
        }
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }
        if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
        
        if(e.target.name === 'confirmPassword'){
            setconfirmPassword(e.target.value);
        }
        
    
    }
    const register = async(e) => {
        e.preventDefault();

        var hashedPassword = bcrypt.hashSync(password, 6);
        var hashedconfirmPassword = bcrypt.hashSync(confirmPassword, 6);
    
        try {
            if( password !== confirmPassword){
                toast("Password and Confirm password don't match")

            }
            else{
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                await addDoc(usersCollectionRef,{
                    displayName: name,
                    email: email, 
                    password: hashedPassword,
                    confirmPassword: hashedconfirmPassword,
                    
                })
                toast("Successfully Signup");
                navigate("/");

            }
            
        } catch(e){
            console.log(e.message)
            toast(e.message);
        }
    
        setName("")
        setEmail("");
        setPassword("");
        setconfirmPassword("");
    
    
    
    }
    
 
    return (
        <>
        <MainContent 
        content={
            <div className="px-16 py-6 bg-gray-100">
        <ToastContainer/>
              <div className="one w-full max-w-md">
                   <form className=" px-8 pt-6 pb-8 mb-4" onSubmit={register} >
                   <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Name
                        </label>
                         <input onChange={handlingChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="name" id="name" type="text" placeholder="name"/>
                         </div>
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
                         <div className="mb-6">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Confirm Password
                         </label>
                         <input onChange={handlingChange} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline" name="confirmPassword" id="confirmPassword" type="password" placeholder="******************"/>
                         </div>
                         <div className="flex items-center justify-between">
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                         </button>
                         <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
                         >
                        <Link to="/login"> Already Have an account?  </Link>
                            
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
export default Register;
