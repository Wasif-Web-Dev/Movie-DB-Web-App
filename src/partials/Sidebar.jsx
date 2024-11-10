import { useGSAP } from "@gsap/react";
import gsap from "gsap/gsap-core";
import React from "react";
import {Link} from "react-router-dom";

function Sidebar() {

    useGSAP(()=>{
        gsap.set(".animate-stuff",{
            x:-400,
            opacity:1,
        })
        gsap.to(".animate-stuff",{
            x:0,
            opacity:1,
            duration:1,
            ease:"power2.Out",
            stagger:.2
        })
    })


    return (
        <div className="animate-stuff w-[20%] h-full  p-10 border-r-2 border-zinc-400 text-zinc-100">
            <h1 className="animate-stuff ">
                <i className="ri-tv-fill text-[#6556CD] mr-2 text-2xl"></i>
                <span className=" text-2xl">SCSDB.</span>
            </h1>
            <h1 className="animate-stuff my-5 font-bold text-xl">News Feed</h1>
            <nav className="flex flex-col gap-2">
                <Link to="/trending" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-fire-fill"></i> Trending
                </Link>
                <Link to="/popular" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-magic-fill"></i> Popular
                </Link>
                <Link to="/movie" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-movie-fill"></i> Movies
                </Link>
                <Link to="/tv-shows" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-tv-2-fill"></i> TV Shows
                </Link>
                <Link to="/people" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-team-fill"></i> People
                </Link>
                <hr className="animate-stuff" />
                <h1 className="animate-stuff my-5 font-bold text-xl">About Website</h1>
                <Link to="/About" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-information-fill"></i> About Us
                </Link>
                <Link to="/contact" className="animate-stuff p-4 hover:bg-[#6556CD] rounded-lg hover:text-zinc-50 duration-200">
                    <i className="ri-customer-service-fill"></i> Contact Us
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
