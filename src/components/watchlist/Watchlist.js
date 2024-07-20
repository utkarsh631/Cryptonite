import React from 'react';
import Grid from '../Grid/Grid';
import Header from '../common/Header';

const Watchlist = () => {
  const [watchlist, setWatchlist] = React.useState([]);

  React.useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (coinId) => {
    const updatedWatchlist = watchlist.filter((coin) => coin.id !== coinId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Watchlist</h2>
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-8 shadow-lg">
            <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-400">Your watchlist is empty</p>
            <p className="mt-2 text-gray-500">Add coins to your watchlist to track them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((coin) => (
              <Grid
                key={coin.id}
                coin={coin}
                removeFromWatchlist={removeFromWatchlist}
                isWatchlisted={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Watchlist;
