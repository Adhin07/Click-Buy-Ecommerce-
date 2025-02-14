import React from 'react'
import CANCELIMAGE from '../assest/cancel.avif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-salte-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-2 '>
    <img src={CANCELIMAGE} width={300} className='mix-blend-multiply animate-bounce '
    height={300} alt='cancelImg'/>
    
    <p className='text-red-600 font-bold text-lg'> payment Cancelled</p>
    <Link to={'/cart'} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go to cart</Link>
    </div>
  )
}

export default Cancel
