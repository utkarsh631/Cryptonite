import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';

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
          <div  className='  text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100 '>Home</div>
          <div className=' text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Compare</div>
          <div className=' text-gray-300 hover:text-white hover:scale-105 cursor-pointer transition-all duration-100'>Watchlist</div>
          <div className=' rounded-full p-1  text-gray-300 hover:text-white hover:scale-105 transition-all duration-100 cursor-pointer'>Dashboard</div>
           </div>
          </Drawer>
    </div>
  );
}