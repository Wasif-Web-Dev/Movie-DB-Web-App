import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../partials/Loading'
import Cards from '../partials/Cards'
import DropDown from '../partials/DropDown'
import axios from '../utils/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'

function Movie() {


    document.title = "SCSDB | Movie"

    const [category, setCategory] = useState("now_playing")
    const [movie, setmovie] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const getMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)

        if(data.results.length > 0){

    // setMovie(data.results)
    setmovie((prevState)=> [...prevState, ...data.results])
    setPage(page + 1)
}
else{
    sethasMore(false)
}


        }
         catch (error) {
            console.log("Error :", error)
        }
    }

const refreshHandler = ()=>{
    if (movie.length === 0){
        getMovie()
        
    }
    else{
        setPage(1)
        setmovie([])
getMovie()
    }
}

    useEffect(() => {
        refreshHandler()
    }, [category])



    const navigate = useNavigate()





  return movie.length > 0 ? (
    <div className='  w-screen h-screen bg-[#1E1D23]'>
        <div className='w-full flex items-center justify-between px-[3%]'>

            <h1 className='text-2xl font-semibold text-zinc-400'> <i onClick={() => navigate(-1)} className="hover:text-[#6952ff] cursor-pointer ri-arrow-left-fill"></i> movie</h1>
            <div className='w-[90%] flex items-center '>

                <Topnav />
                <div className='flex  gap-4 ml-10'>
                <DropDown title="category" option={["popular", "top_rated","upcoming","now_playing"]} func={(e) => setCategory(e.target.value)} />
                {/* <DropDown title="Duration" option={["day", "week"]} func={(e) => setduration(e.target.value)} /> */}
                </div>
            </div>
        </div>
        <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1 className='text-white text-xl'>Loading</h1>}
        >
        <Cards data={movie} title={category}/>
        </InfiniteScroll>
    </div>
):<Loading/>
}

export default Movie