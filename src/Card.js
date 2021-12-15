import React,{useContext, useState} from "react";

import { Link } from "react-router-dom";
import {AppointmentContext} from "./Context";



const Card = ({appointment,name, currentEmail,note}) => {
    // const {appointments,setAppointments} = useContext(AppointmentContext);
    return(
        <>
        <div className="ui container" style={{ marginTop: "30px" }}>
        {
            appointment ? (
                <div className="">
                <h1>{name}</h1>
                <h1>{currentEmail}</h1>
                {/* <h1>{scheduledDate}</h1> */}
                <h1>{note}</h1>
                        </div>

            ) : (
     <p>No Appointments yet</p>
     )} 
        
       
		</div>
        </>
       
    )

}

export default Card;