import React, { useState } from 'react';

const Description = ({ heading, desc }) => {
    const shortdesc=desc.slice(0,250)+"<br/><span className=' text-gray-200'>  Read more...</span>";
    const [flag,setflag]=useState(true);    
  return (
    <div className="flex flex-col bg-slate-800 mx-auto rounded-lg cursor-pointer mt-2 w-11/12 gap-2 p-2 text-gray-500">
      <div className="text-gray-200 text-xl font-bold">{heading}</div>
      <div className="description-content" onClick={()=>setflag(!flag)} dangerouslySetInnerHTML={{ __html:flag? shortdesc:desc }}></div>
    </div>
  );
};

export default Description;
