import React,{useState, useContext, useEffect} from 'react'
import MainContent from '../components/MainContent';
import { onAuthStateChanged} from "firebase/auth";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth,db} from "../config/firebaseConfig";
import Modal from "../components/Modal";
import {AppointmentContext} from "../Context";
import "firebase/compat/auth";
import {appointmentsCollectionRef} from "../config/firebaseConfig";
import {getDocs, deleteDoc,doc} from "firebase/firestore";



function Home() {

    const {date,setDate,setUserUid, uid, currentEmail,setCurrentEmail,appointments,setAppointments} = useContext(AppointmentContext);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=>{
        const getAppointments = async () => {
            const data = await getDocs(appointmentsCollectionRef);
            setAppointments(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

        }
        getAppointments();
    },[])

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setCurrentEmail(user.email);  
                setUserUid(user.uid)
                console.log("Currently logged in user", user.email)
            }
        },[])
        return uid;
    })

  
    

    const onChange = date => {
        setDate(date);
    }


    const cancelAppointment = async(id) => {
        const appointment = doc(db,"appointments",id);

        await deleteDoc(appointment);

    }

   

    return (
        <>
        <MainContent 
        content={
            <>
            <h1 className='block text-gray-700 text-xl font-bold mb-2 text-center'>Home page </h1>
            <div className='grid md:grid-cols-2 my-16 mx-16'>
                <div className='md:col-span-1'>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}

            <div >
                <Calendar className=' bg-red-400'
                    onChange={onChange}
                    value={date}
                    onClickDay = {()=>{ setModalOpen(true);}}
                    
                />
      
     
             </div>

                </div>
                <div className='md:col-span-1'>
                    <h1 className='block text-gray-700 text-xl font-bold mb-2 text-center'>Your scheduled Appointments</h1>
                    {appointments.map((appointment) => {
                        if(currentEmail == appointment.currentEmail){
                          return  (
                              <>
                              <div className="flex justify-between mx-5 bg-gray-300 mb-4 p-3 rounded-xl ">
                                    <div>
                                        <h2 className="font-bold text-xl">{appointment.name}</h2>
                                        <span className="block font-bold  text-sm">{appointment.scheduledDate}</span>
                                        <span className="block  text-sm">{appointment.note}</span>
                                        
                                    </div>
                                    
                                    <div className="flex">
                                    <button >
                                    <img alt="edit" src="https://img.icons8.com/material-two-tone/48/000000/rescheduling-a-task.png"/>
                                    </button>

                                    <button onClick={()=>
                                        cancelAppointment(appointment.id)
                                        } >
                                    <img alt="delete" src="https://img.icons8.com/material-outlined/48/000000/cancel--v1.png"/>
                                    </button>
                                    </div>
                                    </div>
                                </>
                    )
                        }
                            

                        
                            

                        
               
               
                    })}
                  
                    

                 
                   
                </div>
            </div>
            
    
    </>
        }

        />
     </>
    )
}

export default Home
