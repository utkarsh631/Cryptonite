import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

const Grid = ({ coin, addToWatchlist, removeFromWatchlist, isWatchlisted }) => {
  const isPositiveChange = coin.price_change_percentage_24h > 0;

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    if (isWatchlisted) {
      removeFromWatchlist(coin.id);
    } else {
      addToWatchlist(coin);
    }
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className={`relative text-white transition-all duration-100 h-[300px] w-[300px] bg-slate-800 rounded-xl border-2 border-solid border-gray-500 ${coin.price_change_percentage_24h > 0 ? 'hover:border-green-400' : 'hover:border-red-400'}`}>
        <button
          onClick={handleWatchlistClick}
          className="absolute top-2 right-2 z-10 text-yellow-400 hover:text-yellow-500"
        >
          {isWatchlisted ? <StarIcon /> : <StarBorderIcon />}
        </button>
        <div className={`flex flex-col p-2 pt-6`}>
          <div className='flex gap-6 pl-5'>
            <img src={coin.image} className='w-[50px] h-[50px]' alt={coin.name} />
            <div className='flex flex-col'>
              <p className='font-bold text-2xl'>{coin.symbol}-USD</p>
              <p className='text-gray-400'>{coin.name}</p>
            </div>
          </div>
          <div className='flex gap-2 pl-5 pt-6'>
            <div className={`justify-center items-center border rounded-full p-1 px-6 flex transition-all duration-75 ${isPositiveChange ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' : 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white'}`}>
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center transition-all duration-75 ${isPositiveChange ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' : 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'}`}>
              {isPositiveChange ? <TrendingUpIcon /> : <TrendingDownIcon />}
            </div>
          </div>
          <div className="flex pt-6">
            <div className={`text-2xl font-bold pt-3 ml-5 ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
              $ {coin.current_price}
            </div>
          </div>
          <div className="flex flex-col ml-5 mt-2">
            <p className='text-gray-400'>
              <span className='text-gray-300'>Total Volume: </span>{coin.total_volume}
            </p>
            <p className='text-gray-400'>
              <span className='text-gray-300'>Total Supply: </span>{coin.total_supply}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Grid;