import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({data ,title}) => {
    return  (
        <div className='w-ful flex flex-wrap  bg-[#1E1D23] px-[3%] items-center justify-center'>
            {data.map((c,i)=>(
            <Link className='w-[25vh] mb-[%] mr-[5%]  ' key={i}>

                <img className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path }`} alt="" />
                <h1 className='text-2xl text-zinc-300'>

                 {c.original_title || c.name ||c.original_name ||c.title}
                </h1>

            </Link>
           ))} 
        </div>
    ) 
}

export default Cards