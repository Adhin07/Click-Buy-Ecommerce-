import React from 'react'
import SUCCESSIMAGE from '../assest/payment_successfull_main.png'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-salte-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-2'>
    <img src={SUCCESSIMAGE} width={300}
    height={300} className='mix-blend-multiply' alt='success-img'/>
 
    <Link to={'/order'} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success
