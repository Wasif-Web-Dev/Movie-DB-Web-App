import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Topnav from "../partials/Topnav";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loading from "../partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
    document.title = "SCSDB | Trending";

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
        <div className="  w-screen h-screen bg-[#1E1D23]">
            <div className="w-full flex items-center justify-between px-[3%]">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    {" "}
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] cursor-pointer ri-arrow-left-fill"
                    ></i>{" "}
                    Trending
                </h1>
                <div className="w-[90%] flex items-center ">
                    <Topnav />
                    <div className="flex  gap-4 ml-10">
                        <DropDown
                            title="Trending"
                            option={["movie", "tv", "all"]}
                            func={(e) => setCategory(e.target.value)}
                        />
                        <DropDown title="Duration" option={["day", "week"]} func={(e) => setduration(e.target.value)} />
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
