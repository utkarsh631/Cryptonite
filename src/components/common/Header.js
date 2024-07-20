import React from 'react'
// import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import AnchorTemporaryDrawer from './Drawer';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Header = () => {
  const navigate=useNavigate();
  return (
    <div  className=' h-[80px] p-5 pl-16 pt-6 bg-slate-900'>
      <div className='flex justify-between pr-4'>
      <Link to={'/'}>
        <div className='  text-3xl font-bold font-poppins text-white'>Cryptonite.</div>
      </Link>
        <div className=' flex justify-center items-center gap-5 '>
          {/* <div className='links linkss'><Switch {...label} defaultChecked /></div> */}
          <Link to={'/'}  className=' links text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100 '>Home</Link>
          <Link to={'/compare'} className=' links text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Compare</Link>
          <Link to={'/watchlist'} className=' links text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Watchlist</Link>
          <Link to={'/dashboard'}  className=' hover:shadow-lg hover:shadow-blue-400  links bg-blue-500 rounded-full p-2 text-white hover:scale-90 transition-all duration-100 cursor-pointer'>Dashboard</Link>
        </div>
        <div className=' mobile-drawer '>
          <AnchorTemporaryDrawer/>
        </div>
      </div>
    </div>
  )
}
export default Header