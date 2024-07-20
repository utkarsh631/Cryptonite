import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from 'react-router-dom';

const Table = ({ coin }) => {
  const isPositiveChange = coin.price_change_percentage_24h > 0;

  return (
    <tr className="border rounded-full mb-2 border-gray-700 hover:border-solid hover:border-2 transition-all duration-300">
      <td className='p-2'>
        <img src={coin.image} className='w-[50px] h-[50px]' alt={coin.name} />
      </td>
      <td className='p-2'>
        <Link to={`/coin/${coin.id}`}><div className='flex  justify-center items-center gap-2'>
          <p className='font-bold text-lg sm:text-xl'>{coin.symbol}-USD</p>
          <p className='text-gray-400'>{coin.name}</p>
        </div></Link>
      </td>
      <td className='p-2'>
        <div className={`border rounded-full p-1 px-6 transition-all duration-75 ${isPositiveChange ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' : 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white'} flex justify-center items-center`}>
          {coin.price_change_percentage_24h.toFixed(2)} %
        </div>
      </td>
      <td className='p-2'>
        <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center transition-all duration-75 ${isPositiveChange ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' : 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'}`}>
          {isPositiveChange ? <div className='h-[30px] w-[30px] flex justify-center items-center rounded-full border border-green-400'><TrendingUpIcon /> </div>:<div className="h-[30px] w-[30px] flex justify-center items-center rounded-full border border-red-400"><TrendingDownIcon/></div> }
        </div>
      </td>
      <td className='p-2'>
        <div className={`text-lg sm:text-xl font-bold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
          $ {coin.current_price}
        </div>
      </td>
      <td className='p-2'>
        <p className='text-gray-400'>
          {coin.total_volume}
        </p>
      </td>
      <td className='p-2'>
        <p className='text-gray-400'>
          {coin.total_supply}
        </p>
      </td>
    </tr>
  );
};

export default Table;
