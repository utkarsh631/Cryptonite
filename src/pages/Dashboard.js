import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Tabs from '../components/Dashboard/Tabs';
import axios from 'axios';
import Search from '../../src/components/Search/Search'
import PaginationControlled from '../components/Pagination/Pagination';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page when search changes
    };

    const filteredCoins = coins.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase())
    );

    const pageCount = Math.ceil(filteredCoins.length / itemsPerPage);

    const paginatedCoins = filteredCoins.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const options = {
                method: 'GET',
                url: 'https://api.coingecko.com/api/v3/coins/markets',
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false
                }
            };

            try {
                const response = await axios.request(options);
                setCoins(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    return (
        <div className=''>
            <Header />
            <Search search={search} onSearchChange={onSearchChange} />
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <Tabs coins={paginatedCoins} />
                    <div className='justify-center items-center flex '>
                        <PaginationControlled page={page} handlePageChange={handlePageChange} count={pageCount} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;