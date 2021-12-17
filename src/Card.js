import React from "react";




const Card = ({appointment,name, currentEmail,note,scheduledDate}) => {
    return(
        <>
         {
            appointment ? (

                    <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white  rounded-lg shadow">
                    <ul className="flex flex-col divide-y w-full">
                        <li className="flex flex-row">
                        <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                            <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white">{currentEmail}</div>
                            <div className="text-gray-600 dark:text-gray-200 text-sm mb-3">{name}</div>
                            <div className="text-gray-600 dark:text-gray-200 text-sm">{note}</div>
                            </div>
                            <div className="text-gray-600 dark:text-gray-200 text-xs">{scheduledDate}</div>
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