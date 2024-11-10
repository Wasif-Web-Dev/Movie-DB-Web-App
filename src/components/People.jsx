import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Loading from "../partials/Loading";
import Cards from "../partials/Cards";
import DropDown from "../partials/DropDown";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "../partials/Topnav";

const People = () => {
    document.title = "SCSDB | Person";

    const [category, setCategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`/person/${category}?page=${page}`);

            if (data.results.length > 0) {
                // settrending(data.results)
                setperson((prevState) => [...prevState, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const refreshHandler = () => {
        if (person.length === 0) {
            getTrending();
        } else {
            setPage(1);
            setperson([]);
            getTrending();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    const navigate = useNavigate();

    return person.length > 0 ? (
        <div className="  w-screen h-screen bg-[#1E1D23]">
            <div className="w-full flex items-center justify-between px-[3%]">
                <h1 className="flex items-center gap-1 ext-2xl font-semibold text-zinc-400">
                    {" "}
                    <i
                        onClick={() => navigate(-1)}
                        className="mt-2 hover:text-[#6952ff] cursor-pointer ri-arrow-left-fill"
                    ></i>{" "}
                    person{" "}
                </h1>
                <div className="w-[90%] flex items-center ">
                    <Topnav />
                    <div className="flex  gap-4 ml-10">
                        {/* <DropDown title="person" option={["tv", "movie"]} func={(e) => setCategory(e.target.value)} /> */}
                        {/* <DropDown title="Duration" option={["day", "week"]} func={(e) => setduration(e.target.value)} /> */}
                    </div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={person.length}
                next={getTrending}
                hasMore={hasMore}
                loader={<h1 className="text-white text-xl">Loading</h1>}
            >
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
};

export default People;
