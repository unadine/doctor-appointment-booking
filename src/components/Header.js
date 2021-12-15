import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { auth } from "../config/firebaseConfig"
import {AppointmentContext} from "../Context";
import {signOut } from "firebase/auth";
import { useNavigate } from "react-router";

function Header() {
    const {uid, currentEmail} = useContext(AppointmentContext);
    const navigate = useNavigate();

    const navStyle = {
        margin: "20px",
        textDecoration: "none",
        color: "#fbb6ce"
      };
    return (
        <>
        <header className='shadow-lg '>
        <nav className="bg-green-700 py-2 text-center justify-between">
            <Link to="/" style={navStyle}>
                HOME
            </Link>
            <Link to="/login" style={navStyle}>
                LOGIN 
            </Link>
            <Link to="/register" style={navStyle}>
                REGISTER
            </Link>

            { uid && [
                <button style={navStyle} onClick={() => {
                        signOut(auth).then(() => {
                        navigate('/login');
    
                        }).catch((error) => {
                            console.log(error)
                        });
                    }}>
                    LOGOUT
                </button>

             ] }
             { currentEmail == "admin@admin.com" && [
                <button style={navStyle} onClick={() => { navigate("/dashboard")
                    }}>
                    ADMIN
                </button>

             ] }

            


    </nav>
           
            
        </header>
        </>
    )
}


export default Header;
