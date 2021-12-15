import React,{useContext, useEffect, useState} from 'react';
import {appointmentsCollectionRef} from "../config/firebaseConfig";
import {AppointmentContext} from "../Context";
import {getDocs} from "firebase/firestore";
import Card from '../Card';
import Calendar from 'react-calendar';

const Dashboard = () => {
   
    const {appointments,setAppointments} = useContext(AppointmentContext);

   
    return (
        <div>
           {appointments.map((appointment) => (
               
               <Card 
                   key = {appointment.id}
                   appointment={appointment}
                //    scheduledDate={appointment.scheduledDate}
                   name ={appointment.name}
                   currentEmail ={appointment.currentEmail}
                   note = {appointment.note}
               />
               ))}
            
        </div>
    )
}

export default Dashboard
