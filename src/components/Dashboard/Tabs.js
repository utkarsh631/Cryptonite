import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid/Grid';
import Table from '../Table/Table';

export default function Tabs({coins}) {
  const [value, setValue] = useState('1');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addToWatchlist = (coin) => {
    const updatedWatchlist = [...watchlist, coin];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchlist = (coinId) => {
    const updatedWatchlist = watchlist.filter((coin) => coin.id !== coinId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const isWatchlisted = (coinId) => watchlist.some((coin) => coin.id === coinId);

  const style={
    color:"var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"",
    textTransform:"capitalize"
  };

  return (
    <div className=' text-white'>
      <TabContext value={value}>  
        <TabList onChange={handleChange} aria-label="lab API tabs example"  variant="fullWidth">
          <Tab className='text-white' label="Grid" value="1" sx={style} />
          <Tab className=' text-white' label="List" value="2" sx={style}/>
        </TabList>
        <TabPanel className=' text-white  ' value="1">
          <div className='flex justify-center gap-3 m-1 items-center flex-wrap'>
            {coins.map((coin,i)=>{
              return <Grid 
                coin={coin} 
                key={i}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
                isWatchlisted={isWatchlisted(coin.id)}
              />;
            })}
          </div>
        </TabPanel>
        <TabPanel  className=' text-white' value="2">
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-slate-800 text-white border-separate border-spacing-0'>
              <thead>
                <tr className='bg-gray-700'>
                  <th className='p-2'>Icon</th>
                  <th className='p-2'>Coin</th>
                  <th className='p-2'>Change</th>
                  <th className='p-2'>Trend</th>
                  <th className='p-2'>Price</th>
                  <th className='p-2'>Volume</th>
                  <th className='p-2'>Supply</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => (
                  <Table 
                    key={index} 
                    coin={coin}
                    addToWatchlist={addToWatchlist}
                    removeFromWatchlist={removeFromWatchlist}
                    isWatchlisted={isWatchlisted(coin.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}