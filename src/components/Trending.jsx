import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Topnav from "../partials/Topnav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "../partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Trending() {
    document.title = "SCSDB | Trending";

    const trTRef = useRef(null);
    useGSAP(() => {
        gsap.from(trTRef.current, {
            y: 300,
            duration: 1,
            stagger: 0.2,
            ease: "power2.Out",
        });
    });

    const [category, setCategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`);

            if (data.results.length > 0) {
                // settrending(data.results)
                settrending((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const refreshHandler = () => {
        if (trending.length === 0) {
            getTrending();
        } else {
            setPage(1);
            settrending([]);
            getTrending();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category, duration]);

    const navigate = useNavigate();
    return trending.length > 0 ? (
        <div className="w-screen overflow- h-screen bg-[#1E1D23]">
            <div className="w-full flex items-center justify-between px-[2%]">
                <h1
                    ref={trTRef}
                    className="w-[20vw]  text-2xl max-md:text-xl max-sm:text-sm font-semibold text-zinc-400"
                >
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] cursor-pointer ri-arrow-left-fill"
                    ></i>
                    Trending
                </h1>
                <div className="w-[90%] flex items-center ">
                    <Topnav />
                    <div className="flex gap-2">
                        <DropDown
                            title="Trending"
                            option={["movie", "tv", "all"]}
                            func={(e) => setCategory(e.target.value)}
                        />
                        <div className="max-tabletM:hidden">
                            <DropDown
                                title="Duration"
                                option={["day", "week"]}
                                func={(e) => setduration(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length}
                next={getTrending}
                hasMore={hasMore}
                loader={<h1 className="text-white text-xl">Loading</h1>}
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Trending;
