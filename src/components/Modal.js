import React,{useRef, useContext, useEffect} from "react";
import "./Modal.css";
import {appointmentsCollectionRef} from "../config/firebaseConfig";
import {addDoc} from "firebase/firestore";
import {AppointmentContext} from "../Context";


function Modal({ setOpenModal }) {

  const {date,currentEmail} = useContext(AppointmentContext);

 

    const appointmentNameRef = useRef();
    const appointmentNoteRef = useRef();
    const formRef = useRef();

    const handleAppointment = async(e) =>{
      e.preventDefault();

        const name = appointmentNameRef.current.value;
        const note = appointmentNoteRef.current.value;

        await addDoc(appointmentsCollectionRef,{
            currentEmail: currentEmail,
            scheduledDate: date.toLocaleDateString(),
            name: name,
            note: note,  
        })
        formRef.current.reset();
        setOpenModal(false);
    }

  return (
    <div className="modalBackground" >
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        
          <h1 className="block text-gray-700 text-xl font-bold mb-2 text-center">Add Appointment</h1>
          <form ref ={formRef} onSubmit = {handleAppointment}>
          <div className="mb-4">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                             Name
                        </label>
                         <input ref={appointmentNameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="name" id="name" type="text" placeholder="name"/>
                         </div>
                         <div className="mb-6">
                         <label className="block text-gray-700 text-sm font-bold mb-2" >
                             Note
                         </label>
                         <textarea
                              ref = {appointmentNoteRef}
                                name="notes"
                                placeholder="Enter note..."
                                cols="10"
                                rows="5"
                                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                                required
                            ></textarea>
                         </div>
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Add</button>
         
          </form>   
                           
      </div>
    </div>
  );
}

export default Modal;
