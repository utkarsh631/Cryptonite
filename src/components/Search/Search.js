import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
const Search = ({search,onSearchChange}) => {
  return (
    <div className=' bg-slate-700 w-[70%] h-10 flex rounded-full justify-start p-2 gap-6 mx-auto pl-5'>
        <SearchIcon/>
        <input className=' bg-transparent w-full border-transparent font-thin outline-none text-gray-300' placeholder='  Search here' type='text' value={search} onChange={(e)=>onSearchChange(e)}/>
    </div>
  )
}

export default Search