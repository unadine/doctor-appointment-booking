import React,{useRef, useContext, useEffect} from "react";
import "./Modal.css";
import {appointmentsCollectionRef,db} from "../config/firebaseConfig";
import {updateDoc,doc} from "firebase/firestore";
import {AppointmentContext} from "../Context";


const RescheduleModal = ({  setRescheduleModalOpen,id,scheduledDate }) => {


 
    const rescheduleRef = useRef();
    const formRef = useRef();


    const handleReschedule = async(e) =>{
      e.preventDefault();
      const rescheduledDate = rescheduleRef.current.value;
          const appointmentsDoc = doc(db,"appointments",id);
          const newDate = {scheduledDate: rescheduledDate}
          await updateDoc(appointmentsDoc,newDate )
          formRef.current.reset();
          setRescheduleModalOpen(false);
        }

        
    

  return (
    <div className="modalBackground" >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setRescheduleModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        
          <h1 className="block text-gray-700 text-xl font-bold mb-5 text-center">Reschedule Appointment</h1>
          <form ref ={formRef} onSubmit = {handleReschedule}>
          <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                             Reschedule Date
                        </label>
                        <input
                              ref= {rescheduleRef}
                              type="date"
                              name="date"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                              id="date"
                              required
                  />
                        
                         </div>
                         
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Reschedule</button>
         
          </form>   
                           
      </div>
    </div>
  );
}

export default RescheduleModal;
