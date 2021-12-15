import React,{useContext} from 'react';
import {AppointmentContext} from "../Context";
import {Navigate} from 'react-router-dom'



const AdminRoute = ({component: Component}) => {
    const {currentEmail} = useContext(AppointmentContext);

    if(currentEmail == "admin@admin.com") return <Component/>;
    return <Navigate to ="/"/>
   
}

export default AdminRoute
