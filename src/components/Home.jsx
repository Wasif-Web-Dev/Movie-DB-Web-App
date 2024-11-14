import React, {useEffect, useRef, useState} from "react";
import Sidebar from "../partials/Sidebar";
import Topnav from "../partials/Topnav";
import axios from "../utils/axios";
import Header from "../partials/Header";
import HorizontalCards from "../partials/HorizontalCards";
import DropDown from "../partials/DropDown";
import Loading from "../partials/Loading";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function Home() {
    const TrendingRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    useGSAP(() => {
        gsap.from(".Trending-animation", {
            y: 200,
            opacity: 0,
            duration: 1,
        });
    }, [TrendingRef.current]);

    document.title = "SCSDB | Home";
    const [wallpaper, setWallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState("all");

    const getWallpapers = async () => {
        try {
            const {data} = await axios.get(`/trending/all/day`);
            let randomData = data.results[(Math.random() * data.results.length).toFixed()];
            setWallpaper(randomData);
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`/trending/${category}/day`);
            settrending(data.results);
        } catch (error) {
            console.log("Error :", error);
        }
    };

    useEffect(() => {
        getTrending();
        !wallpaper && getWallpapers();
    }, [category]);

    return (
        wallpaper,
        trending ? (
            <>
                <Sidebar sidebarOpen={sidebarOpen} />
                <div className="w-[85%] max-2xl:w-[80%] max-Laptop:w-[75%] max-md:w-full h-full overflow-hidden overflow-y-auto">
                    <Topnav />
                    <Header toggleSidebar={toggleSidebar} data={wallpaper} />
                    <div className="p-5 flex justify-between items-center">
                        <div className=" relative overflow-hidden h-8">
                            <h1 ref={TrendingRef} className="Trending-animation text-2xl text-white font-semibold ">
                                Trending
                            </h1>
                        </div>
                        <DropDown
                            title="filter"
                            option={["tv", "movie", "all"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>
                    <HorizontalCards data={trending} />
                </div>
            </>
        ) : (
            <Loading />
        )
    );
}

export default Home;
