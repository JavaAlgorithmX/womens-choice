import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InquiryForm from './Enquiry';

const Home = () => {
  const navigate = useNavigate();
  function handleProcuctClick(){
    navigate('/products');
  }

 


  return (
    <div className='min-h-screen flex items-center justify-center flex-col space-y-2'>
      <h2 className="text-red-500 text-2xl">Welcome to the Women's Choice Ordering App</h2>
      <p className='text-2xl'>Click Here to See our Products</p>
      <button onClick={handleProcuctClick} className='px-10 py-5 drop-shadow-md bg-blue-600 rounded-md text-xl text-white'>Products</button>      
      <InquiryForm/>
    </div>
  );
};


export default Home;
