import React,{useState, createContext} from "react";


export const AppointmentContext = createContext();

export const ContextProvider = (props) =>{

    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [uid,setUserUid] = useState(null);
    const [currentEmail, setCurrentEmail] = useState("")

    const value = {
        currentEmail,
        setCurrentEmail,
        date,
        setDate,
        appointments,
        setAppointments,
        uid,
        setUserUid

    }

    

    return(
        <AppointmentContext.Provider value={value}>

           {props.children}

        </AppointmentContext.Provider>
    )

}