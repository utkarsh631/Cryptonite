// Coinpage.js
import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import { ProgressBar } from 'react-loader-spinner';
import Table2 from '../components/Table/Table2';
import { objects } from '../functions/objects';
import Description from '../components/Description/Description';
import Linechart from '../components/Linecharts/Linechart';

const Coinpage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState();   
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState(null);
    const [currency, setCurrency] = useState('usd');
    const [dataType, setDataType] = useState('prices');

    const processChartData = useCallback((data) => {
        const labels = data[dataType].map(item => new Date(item[0]).toLocaleDateString());
        const values = data[dataType].map(item => item[1]);

        const datasetLabel = {
            prices: `Price (${currency.toUpperCase()})`,
            market_caps: 'Market Cap',
            total_volumes: 'Volume'
        }[dataType];

        return {
            labels,
            datasets: [
                {
                    label: datasetLabel,
                    data: values,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true,
                }
            ]
        };
    }, [dataType, currency]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [response1, response2] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
                    params: {
                        vs_currency: currency,
                        sparkline: false
                    }
                }),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
                    params: {
                        vs_currency: currency,
                        days: days,
                        sparkline: false
                    }
                })
            ]);

            objects(setDatas, response1.data);
            setChartData(processChartData(response2.data));
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            // Optionally, navigate to an error page or show an error message
            // navigate('/error');
        } finally {
            setIsLoading(false);
        }
    }, [id, days, currency, dataType, processChartData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
        <div className='text-white flex flex-col'>
            <Table2 className="items-center w-[80%]" coin={datas} />
            {chartData && (
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
                    <Linechart chartData={chartData} currency={currencySymbol[currency]} dataType={dataType} />
                </div>
            )}
            <Description className="items-center" heading={datas.name} desc={datas.desc} />
        </div>
    );
}

export default Coinpage;