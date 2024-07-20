import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
export default function AnchorTemporaryDrawer() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [open,setopen]=useState(false);
  return (
    <div className=' bg-slate-800 '>
          <Button onClick={()=>setopen(true)}><MenuIcon/></Button>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>{setopen(false)}}

          >
           <div className='  flex flex-col p-2 gap-4 items-start justify-start bg-slate-800 h-full mx-auto '>
           <div className=''><Switch {...label} defaultChecked /></div>
          <Link to={'/'}>
          <div  className='  text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100 '>Home</div>
          </Link>
          <Link to={'/compare'}>
          <div className=' text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Compare</div>
          </Link>
          <Link to={'/watchlist'}>
          <div className=' text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Watchlist</div>
          </Link>
          <Link to={'/dashboard'}>
          <div className=' rounded-full p-1  text-gray-300 hover:text-white hover:scale-105 transition-all duration-100 cursor-pointer'>Dashboard</div>
          </Link>
           </div>
          </Drawer>
    </div>
  );
}
