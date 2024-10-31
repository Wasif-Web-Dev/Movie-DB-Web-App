import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../public/noimage.webp"

function topnav() {
    const [query, setquery] = useState("")
    const [searches, setsearches] = useState([])

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            // console.log(data)
            setsearches(data.results)
        } catch (error) {
            console.log("Error :", error)
        }
    }

    useEffect(() => {
        getSearches()
    }, [query])




    return (
        <div className='flex items-center justify-start px-[20%] gap-5 h-[10vh] relative'>


            <i className="text-3xl text-zinc-300 ri-search-line"></i>
            <input onChange={(e) => setquery(e.target.value)} value={query} className='w-[50%] outline-none border-none bg-transparent text-zinc-300' type="text" placeholder='Search anything' />
            {query.length > 0 && <i onClick={() => setquery("")} className="cursor-pointer text-3xl text-zinc-300 ri-close-line"></i>}

            <div className='rounded-lg max-h-[50vh] overflow-auto bg-zinc-200 w-[40%]  absolute top-[90%]'>
                {searches.map((e, i) => (
                    <Link className='my-5 hover:text-black hover:font-semibold bg-zinc-200 text-zinc-600 flex justify-start items-center w-[100%] h-[10vh] p-12 border-b-2 border-zinc-100'>
                        <img className='mr-10 w-[10vh] h-[10vh] object-cover rounded' src={
                            e.backdrop_path || e.profile_path ? `https://image.tmdb.org/t/p/original/${e.backdrop_path || e.profile_path}`
                                : noimage} alt="" />
                        <span>{e.name || e.title || e.original_names || e.original_title}</span>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export default topnav