import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../partials/Loading";
import Cards from "../partials/Cards";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../partials/Topnav";

const Tvshows = () => {
    document.title = "SCSDB | Tv";

    const [category, setCategory] = useState("airing_today");
    const [Tv, setTv] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const getTv = async () => {
        try {
            const {data} = await axios.get(`/tv/${category}?page=${page}`);

            if (data.results.length > 0) {
                // setTv(data.results)
                setTv((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const refreshHandler = () => {
        if (Tv.length === 0) {
            getTv();
        } else {
            setPage(1);
            setTv([]);
            getTv();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    const navigate = useNavigate();

    return Tv.length > 0 ? (
        <div className=" w-screen overflow- h-screen bg-[#1E1D23]">
            <div className="w-full flex items-center justify-between px-[2%]">
                <h1 className="w-[20vw]  text-2xl max-md:text-xl max-sm:text-sm font-semibold text-zinc-400">
                    {" "}
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] cursor-pointer ri-arrow-left-fill"
                    ></i>{" "}
                    Tv<small className="text-xs mt-[9px] max-sm:hidden">({category})</small>{" "}
                </h1>
                <div className="w-[90%] flex items-center ">
                    <Topnav />
                    <div className="flex gap-2">
                        <DropDown
                            title="category"
                            option={["popular", "top_rated", "on_the_air", "airing_today"]}
                            func={(e) => setCategory(e.target.value)}
                        />
                        {/* <DropDown title="Duration" option={["day", "week"]} func={(e) => setduration(e.target.value)} /> */}
                    </div>
                </div>
            </div>
            <InfiniteScroll dataLength={Tv.length} next={getTv} hasMore={hasMore} loader={<Loading />}>
                <Cards data={Tv} title="tv" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default Tvshows;
