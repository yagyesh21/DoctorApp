import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AppContext} from "../context/AppContext"
import { assets } from '../assets/assets'

const Appointments = () => {
  const {docId} = useParams()
  const {doctors,currencySymbol} = useContext(AppContext)

  const [docInfo,setDocInfo] =useState(null);
  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex]  = useState(0);
  const [slotTime , setSlotTime] = useState("");

  const fetchInfo = async()=>{
    const docInfo = doctors.find(doc =>doc._id ==docId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }

   const getAvailableSlots = () => {
  let today = new Date()
  let allSlots = []

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today)
    currentDate.setDate(today.getDate() + i)

    // End time for this day = 9 PM
    let endTime = new Date(currentDate)
    endTime.setHours(21, 0, 0, 0)

    // Start time
    if (i === 0) {
      currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10)
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    } else {
      currentDate.setHours(10, 0, 0, 0)
    }

    let timeSlots = []
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })

      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      })

      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    allSlots.push(timeSlots)
  }

  setDocSlots(allSlots) // ✅ update once
}

  useEffect(()=>{
    fetchInfo()
  },[doctors,docId])

 useEffect(()=>{
  getAvailableSlots()
 }, [docInfo])

 useEffect(()=>{
    console.log(docSlots)
 },[docSlots])

  return docInfo &&(
    <div>
      {/* Doctors Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
      <img className="bg-indigo-400 w-full sm:max-w-72 rounded-lg"src={docInfo.image}></img>
        </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        {/* Doc Info : */}
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
          {docInfo.name}
          <img className="w-5"src={assets.verified_icon}></img>
        </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>

        {/* Doctor About */}
        <div >
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>ABOUT <img src={assets.info_icon}></img></p>
        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>
        Appointment fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
      </p>
      </div>
      
      </div>
    </div>
  )
}

export default Appointments;