import React,{useContext} from 'react';
import {AppointmentContext} from "../Context";
import Card from '../Card';
import MainContent from '../components/MainContent';


const Dashboard = () => {
   
    const {appointments} = useContext(AppointmentContext);

   
    return (
        <div>
           {appointments.map((appointment) => (
               
               <Card 
                   key = {appointment.id}
                   appointment={appointment}
                   scheduledDate={appointment.scheduledDate}
                   name ={appointment.name}
                   currentEmail ={appointment.currentEmail}
                   note = {appointment.note}
               />
               ))}
            
        </div>
    )
}

export default Dashboard
