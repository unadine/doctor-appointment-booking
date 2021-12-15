import React,{useContext, useState} from "react";

import { Link } from "react-router-dom";
import {AppointmentContext} from "./Context";



const Card = ({appointment,name, currentEmail,note,scheduledDate}) => {
    return(
        <>
         {
            appointment ? (

                    <div class="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white  rounded-lg shadow">
                    <ul class="flex flex-col divide-y w-full">
                        <li class="flex flex-row">
                        <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                            <div class="flex-1 pl-1 mr-16">
                            <div class="font-medium dark:text-white">{currentEmail}</div>
                            <div class="text-gray-600 dark:text-gray-200 text-sm mb-3">{name}</div>
                            <div class="text-gray-600 dark:text-gray-200 text-sm">{note}</div>
                            </div>
                            <div class="text-gray-600 dark:text-gray-200 text-xs">{scheduledDate}</div>
                        </div>
                        </li>

                        
                    </ul>
                    
                    </div>
) : (
     <p>No Appointments yet</p>
     )}
       
        </>
       
    )

}

export default Card;