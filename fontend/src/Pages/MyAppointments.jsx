import React, { useContext } from 'react'
import {AppContext} from '../Context/AppContext'

const MyAppointments = () => {

  const {doctors} = useContext(AppContext)
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <p>My Appoinments</p>

      <div>
        {doctors.slice(0,2).map((item,index)=>(
          <div key={index}>
              <div>
                <img src={item.image} alt="" />
              </div>

              <div>
                <p>{item.name}</p>
                <p>{item.speciality}</p>
                <p>Adress:</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p><span>Date & Time:</span>25, July, 2024 | 8:30 PM</p>
              </div>
                    {/* to make this structure responsive */}
              <div></div> 

              <div>
                <button>Pay Online</button>
                <button>Cancel appointment</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
