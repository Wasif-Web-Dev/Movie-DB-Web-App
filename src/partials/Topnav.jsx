import React from 'react'

function topnav() {
    return (
        <div className='flex items-center justify-center gap-5 h-[10vh] border-2 relative'>


            <i class="text-3xl text-zinc-300 ri-search-line"></i>
            <input className='w-[50%] outline-none border-none bg-transparent text-zinc-300' type="text" placeholder='Search anything' />
            <i class="text-3xl text-zinc-300 ri-close-line"></i>

            <div className='h-[50vh] bg-red-200 w-[50%]  absolute top-[90%]'>
                <img src="" alt="" />
                <h1>Hello everyone</h1>
            </div>
        </div>
    )
}

export default topnav