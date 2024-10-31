import React, { useEffect, useState } from 'react'
import Sidebar from '../partials/Sidebar'
import Topnav from '../partials/Topnav'
import axios from '../utils/axios'
import Header from '../partials/Header'
import HorizontalCards from '../partials/HorizontalCards'
import DropDown from '../partials/DropDown'
import Loading from '../partials/Loading'

function Home() {
  document.title = "SCSDB | Home"
  const [wallpaper, setWallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")



  const getWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`)
      let randomData = data.results[(Math.random() * data.results.length).toFixed()]
      setWallpaper(randomData)
    } catch (error) {
      console.log("Error :", error)
    }
  }

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`)
      settrending(data.results)
    } catch (error) {
      console.log("Error :", error)
    }
  }


  useEffect(() => {
    getTrending()
    !wallpaper && getWallpapers()

  }, [category])


  return wallpaper, trending ? (
    <>
      <Sidebar />
      <div className='w-[80%] h-full  overflow-hidden overflow-y-auto'>
        <Topnav />
        <Header data={wallpaper} />
        <div className='p-5 flex justify-between items-center'>
          <h1 className='text-2xl text-white font-semibold'>Trending</h1>
          <DropDown title="filter" option={["tv", "movie", "all"]} func={e => setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : <Loading />
}

export default Home