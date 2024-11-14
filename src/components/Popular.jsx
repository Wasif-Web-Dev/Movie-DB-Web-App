import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../partials/Loading";
import Cards from "../partials/Cards";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../partials/Topnav";

function Popular() {
    document.title = "SCSDB | Popular";

    const [category, setCategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`${category}/popular?page=${page}`);

            if (data.results.length > 0) {
                // settrending(data.results)
                setpopular((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const refreshHandler = () => {
        if (popular.length === 0) {
            getTrending();
        } else {
            setPage(1);
            setpopular([]);
            getTrending();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    const navigate = useNavigate();

    return popular.length > 0 ? (
        <div className="w-screen overflow- h-screen bg-[#1E1D23]">
            <div className="w-full flex items-center justify-between px-[2%]">
                <h1 className="w-[25vw] border-2 text-2xl max-md:text-xl max-sm:text-sm font-semibold text-zinc-400">
                    {" "}
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] text-xs cursor-pointer ri-arrow-left-fill"
                    ></i>{" "}
                    popular{" "}
                </h1>
                <div className="w-[90%] flex items-center ">
                    <Topnav />
                    <div className="flex gap-2">
                        <DropDown title="Popular" option={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
                        {/* <DropDown title="Duration" option={["day", "week"]} func={(e) => setduration(e.target.value)} /> */}
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={popular.length}
                next={getTrending}
                hasMore={hasMore}
                loader={<h1 className="text-white text-xl">Loading</h1>}
            >
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Popular;
