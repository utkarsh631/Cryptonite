import { Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import peakpx from '../../assets/peakpx.jpg';
import alphaas from '../../assets/alphaas.png';
import abc from '../../assets/abc.gif';
import abc2 from '../../assets/abc2.gif';
import {motion} from 'framer-motion'
import Header from '../common/Header';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
    <Header/>
      <div className='flex justify-around mt-5 gap-5 lg:flex-row flex-col-800'>
        <div className='text-white pt-10'>
          <div className='flex flex-col'>
            <motion.h1 initial={{opacity:0,x:80}}  animate={{opacity:1,x:0}} transition={{duration:1}}  className='text-[90px] h-[100px] font-[poppin] text-stroke hover:text-transparent transition-all duration-150'>
              Track Crypto
            </motion.h1>
            <motion.h1 initial={{opacity:0,x:80}} animate={{opacity:1,x:0}}  transition={{duration:1,delay:0.5}} className='text-[80px] text-blue-500 font-[poppin]'>Real Time.</motion.h1>
          </div>
          <motion.p initial={{opacity:0,x:80}}  animate={{opacity:1,x:0}} transition={{duration:1,delay:0.8}} className='text-gray-400 text-lg font-semibold'>
            A user-friendly web application to track various cryptocurrencies
            <br />
            & Provide real-time updates on cryptocurrency prices
          </motion.p>
          <motion.div initial={{opacity:0,y:80}}  animate={{opacity:1,y:0}} transition={{duration:1,delay:.8} } className='flex p-1 gap-4 mt-4'>
            <div
              onClick={() => { navigate('/dashboard'); }}
              className='hover:shadow-lg hover:shadow-blue-400 links bg-blue-500 rounded-full p-2 text-white hover:scale-90 transition-all duration-100 cursor-pointer'
            >
              Dashboard
            </div>
            <Link to={'/Share'}><div  className='border border-[2px] flex justify-center text-center items-center p-1 pl-2 pr-2 border-blue-500 text-white rounded-full hover:bg-blue-500 hover:scale-95 transition-all duration-100 cursor-pointer'>
              Share App
            </div></Link>
          </motion.div>
        </div>

        <div className='relative mt-10 lg:mt-0'>
          <img className='h-[480px] w-[500px] rounded-lg' src={abc2} alt="Crypto visualization" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
