import React from 'react'
import { Link } from 'react-router-dom';
import DropDown from './DropDown';

function HorizontalCards({ data }) {
    return (




        <div className='w-full  flex overflow-y-hidden mb-5'>
            {data.map((d, i) =>
                <div key={i} className='min-w-[20%]  m-5 bg-zinc-800 mr-5 mb-5'>
                    <img className='w-full h-[50%] object-cover' src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`} alt="" />
                    <div className='h-[50%] p-3 text-white'>
                        <h1 className={"text-xl text-center font-semibold"}>{d.original_title || "Title Not Found!!"}</h1>
                        <p className='mt-2 text-center w-full text-lg'>{d.overview.slice(0, 50)}...<Link className='text-zinc-200'>More</Link></p>
                    </div>
                </div>)}
        </div>

    )
}

export default HorizontalCards;