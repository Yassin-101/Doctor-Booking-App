import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctors = () => {

  const {speciality} = useParams()
  
  const {doctors} = useContext(AppContext)
  return (
    <div>
      <p className='text-black'>Our Doctors</p>
      <p>Book <span className='font-[#18528f]'>an Appointment</span></p>
    </div>
  )
}

export default Doctors
