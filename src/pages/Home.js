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
import RescheduleModal from '../components/RescheduleModal';
import {useNavigate} from  "react-router"



function Home() {

    const {date,setDate,setUserUid, uid, currentEmail,setCurrentEmail,appointments,setAppointments} = useContext(AppointmentContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const getAppointments = async () => {
            const data = await getDocs(appointmentsCollectionRef);
            setAppointments(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

        }
        getAppointments();
    },[appointments])

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if(user){
                setCurrentEmail(user.email);  
                setUserUid(user.uid)
            }
        },[uid])
        return uid;
    })

    const handleOpenModal =()=>{
        setRescheduleModalOpen(true)
        
    }

  
    

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
            <div className='grid md:grid-cols-3 my-16 mx-16'>
                <div className='md:col-span-1'>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}

            <div >
                <Calendar  
                    onChange={onChange}
                    value={date}
                    onClickDay = {()=>{ 
                        if(uid){
                            setModalOpen(true);

                        
                        }else if(currentEmail === "admin@admin.com"){
                            setModalOpen(false);
                        }
                        else {
                            navigate('/login')
                        }
                       }}
                    
                />
      
     
             </div>

                </div>
                <div className='md:col-span-2'>
                    <h1 className='block text-gray-700 text-xl font-bold mb-2 text-center'>Your scheduled Appointments</h1>
                    {appointments.map((appointment) => {
                        if(currentEmail === appointment.currentEmail){
                          return  (
                              <>
                              <div class="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white  rounded-lg shadow">
                                            <ul class="flex flex-col divide-y w-full">
                                                <li class="flex flex-row">
                                                <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                                                    <div class="flex-1 pl-1 mr-16">
                                                    <div class="font-medium dark:text-white">{appointment.name}</div>
                                                    <div class="text-gray-600 dark:text-gray-200 text-sm mb-3">{appointment.scheduledDate}</div>
                                                    <div class="text-gray-600 dark:text-gray-200 text-sm">{appointment.note}</div>
                                                    </div>
                                                    {rescheduleModalOpen && <RescheduleModal 
                                                        scheduledDate = {appointment.scheduledDate}
                                                        id={appointment.id} 
                                                        setRescheduleModalOpen={ setRescheduleModalOpen} />}

                                                    <div class="text-gray-600 dark:text-gray-200 text-xs">
                                                        <button onClick = {
                                                            handleOpenModal }>
                                                            <img alt="edit" src="https://img.icons8.com/material-two-tone/24/000000/rescheduling-a-task.png"/>
                                                        </button>

                                                        <button onClick={()=>
                                                            cancelAppointment(appointment.id) } >
                                                            <img alt="delete" src="https://img.icons8.com/material-outlined/24/000000/cancel--v1.png"/>
                                                        </button>
                                    </div>
                                                </div>
                                                </li>

                                                
                                            </ul>
                                            
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
