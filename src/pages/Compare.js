import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';
import Linechart from '../components/Linecharts/Linechart';
import Table2 from '../components/Table/Table2';
import { coinObject } from '../functions/coinObject';
import Description from '../components/Description/Description';
import Header from '../components/common/Header';

const Compare = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [coinList, setCoinList] = useState([]);
    const [selectedCoins, setSelectedCoins] = useState(['bitcoin', 'ethereum']);
    const [coinData, setCoinData] = useState({});
    const [chartData, setChartData] = useState({});
    const [days, setDays] = useState(30);
    const [currency, setCurrency] = useState('usd');
    const [dataType, setDataType] = useState('prices');

    const fetchCoinList = useCallback(async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false
                }
            });
            setCoinList(response.data);
        } catch (error) {
            console.error("Error fetching coin list:", error);
        }
    }, []);

    const fetchCoinData = useCallback(async () => {
        setIsLoading(true);
        try {
            const responses = await Promise.all(selectedCoins.map(coin => 
                axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`, {
                    params: {
                        vs_currency: currency,
                        sparkline: false
                    }
                })
            ));

            const chartResponses = await Promise.all(selectedCoins.map(coin => 
                axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
                    params: {
                        vs_currency: currency,
                        days: days,
                        sparkline: false
                    }
                })
            ));

            const newCoinData = {};
            const newChartData = {};

            responses.forEach((response, index) => {
                coinObject(newData => {
                    newCoinData[selectedCoins[index]] = newData;
                }, response.data);
            });

            chartResponses.forEach((response, index) => {
                newChartData[selectedCoins[index]] = response.data;
            });

            setCoinData(newCoinData);
            setChartData(newChartData);
        } catch (error) {
            console.error("Error fetching coin data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCoins, currency, days]);

    useEffect(() => {
        fetchCoinList();
    }, [fetchCoinList]);

    useEffect(() => {
        if (selectedCoins.length === 2) {
            fetchCoinData();
        }
    }, [fetchCoinData, selectedCoins]);

    const processChartData = useCallback(() => {
        if (!chartData[selectedCoins[0]] || !chartData[selectedCoins[1]]) return null;

        const labels = chartData[selectedCoins[0]][dataType].map(item => new Date(item[0]).toLocaleDateString());
        const datasets = selectedCoins.map((coin, index) => ({
            label: `${coin.charAt(0).toUpperCase() + coin.slice(1)} ${dataType === 'prices' ? `Price (${currency.toUpperCase()})` : dataType === 'market_caps' ? 'Market Cap' : 'Volume'}`,
            data: chartData[coin][dataType].map(item => item[1]),
            borderColor: index === 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)',
            backgroundColor: index === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
            tension: 0.1,
            fill: true,
        }));

        return { labels, datasets };
    }, [chartData, selectedCoins, dataType, currency]);

    const handleCoinChange = (index, value) => {
        setSelectedCoins(prev => {
            const newCoins = [...prev];
            newCoins[index] = value;
            return newCoins;
        });
    };

    const handleDaysChange = (event) => {
        setDays(Number(event.target.value));
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleDataTypeChange = (event) => {
        setDataType(event.target.value);
    };

    const currencySymbol = {
        usd: '$',
        eur: '€',
        gbp: '£',
        jpy: '¥',
    };

    if (isLoading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <ProgressBar
                    visible={true}
                    height="280"
                    width="280"
                    color="#4fa94d"
                    ariaLabel="progress-bar-loading"
                />
            </div>
        );
    }

    return (
        <div className='text-white flex flex-col p-4'>
        <Header/>
            <h1 className="text-3xl font-bold mb-4">Compare Coins</h1>
            <div className="flex justify-between mb-4">
                {[0, 1].map(index => (
                    <select
                        key={index}
                        value={selectedCoins[index]}
                        onChange={(e) => handleCoinChange(index, e.target.value)}
                        className="bg-gray-700 text-white p-2 rounded"
                    >
                        {coinList.map(coin => (
                            <option key={coin.id} value={coin.id}>{coin.name}</option>
                        ))}
                    </select>
                ))}
            </div>
            <div className="flex justify-between">
                {selectedCoins.map(coin => coinData[coin] && (
                    <div key={coin} className="w-[48%]">
                        <Table2 className="items-center w-full" coin={coinData[coin]} />
                    </div>
                ))}
            </div>
            {processChartData() && (
                <div className="w-full max-w-4xl mx-auto my-8 bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="mb-4 flex justify-between items-center flex-wrap">
                        <select 
                            value={days} 
                            onChange={handleDaysChange}
                            className="bg-gray-700 text-white p-2 rounded m-1"
                        >
                            <option value={30}>30 Days</option>
                            <option value={60}>60 Days</option>
                            <option value={90}>90 Days</option>
                            <option value={180}>180 Days</option>
                            <option value={365}>1 Year</option>
                        </select>
                        <select 
                            value={currency} 
                            onChange={handleCurrencyChange}
                            className="bg-gray-700 text-white p-2 rounded m-1"
                        >
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                            <option value="jpy">JPY</option>
                        </select>
                        <select 
                            value={dataType} 
                            onChange={handleDataTypeChange}
                            className="bg-gray-700 text-white p-2 rounded m-1"
                        >
                            <option value="prices">Price</option>
                            <option value="market_caps">Market Cap</option>
                            <option value="total_volumes">Volume</option>
                        </select>
                    </div>
                    <Linechart chartData={processChartData()} currency={currencySymbol[currency]} dataType={dataType} />
                </div>
            )}
            {selectedCoins.map(coin => coinData[coin] && (
                <Description key={coin} className="items-center mb-8" heading={coinData[coin].name} desc={coinData[coin].desc} />
            ))}
        </div>
    );
};

export default Compare;