import React from 'react';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Table2 = ({ coin }) => {
  const isPositiveChange = coin.price_change_percentage_24h > 0;

  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <table className="table-auto w-11/12 gap-6 bg-slate-800 text-white rounded-lg overflow-hidden">
        <thead className=" bg-slate-900 gap-4">
          <tr className="text-left text-gray-500 uppercase">
            <th className="px-4 py-2">Icon</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">24h Change</th>
            <th className="px-4 py-2">Trend</th>
            <th className="px-4 py-2">Current Price</th>
            <th className="px-4 py-2">Total Volume</th>
          </tr>
        </thead>
        <tbody className=' mt-8'>
          <tr className=" mt-8 rounded-full mb-2 transition-all duration-300">
            <td className="p-2">
              <img src={coin.image} className="w-[50px] h-[50px]" alt={coin.name} />
            </td>
            <td className="p-2">
              <div className="flex justify-center items-center gap-2">
                <p className="font-bold text-lg sm:text-xl">{coin.symbol}-USD</p>
                <p className="text-gray-400">{coin.name}</p>
              </div>
            </td>
            <td className="p-2">
              <div
                className={`border rounded-full p-1 px-6 transition-all duration-75 ${
                  isPositiveChange
                    ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white'
                    : 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white'
                } flex justify-center items-center`}
              >
                {coin.price_change_percentage_24h.toFixed(2)} %
              </div>
            </td>
            <td className="p-2">
              <div
                className={`w-[35px] h-[35px] rounded-full flex justify-center items-center transition-all duration-75 ${
                  isPositiveChange
                    ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white'
                    : 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
                }`}
              >
                {isPositiveChange ? (
                  <div className="h-[30px] w-[30px] flex justify-center items-center rounded-full border border-green-400">
                    <TrendingUpIcon />
                  </div>
                ) : (
                  <div className="h-[30px] w-[30px] flex justify-center items-center rounded-full border border-red-400">
                    <TrendingDownIcon />
                  </div>
                )}
              </div>
            </td>
            <td className="p-2">
              <div className={`text-lg sm:text-xl font-bold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                $ {coin.current_price}
              </div>
            </td>
            <td className="p-2">
              <p className="text-gray-400">{coin.total_volume}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
