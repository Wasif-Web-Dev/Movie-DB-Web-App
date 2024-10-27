import React from 'react'
import Sidebar from '../partials/Sidebar'
import Topnav from '../partials/topnav'

function Home() {
    document.title = "SCSDB | Home"
  return (
    <>
    <Sidebar/>
    <div className='w-[80%] h-full'>
        <Topnav/>
    </div>
    </>
  )
}

export default Home