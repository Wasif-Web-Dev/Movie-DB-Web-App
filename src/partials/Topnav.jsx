import axios from "../utils/axios";
import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import noimage from "../../public/noimage.webp";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function topnav({toggleSidebar}) {
    // const SearchRef = useRef(null);
    // const inputRef = useRef(null);
    // const crossRef = useRef(null);

    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([]);

    const getSearches = async () => {
        try {
            const {data} = await axios.get(`/search/multi?query=${query}`);
            setsearches(data.results);
        } catch (error) {
            console.log("Error :", error);
        }
    };

    useGSAP(() => {
        gsap.from(".nav-search_animate", {
            y: -300,
            duration: 2,
            stagger: 0.2,
            ease: "power2.Out",
        });
    });
    useEffect(() => {
        getSearches();
    }, [query, searches]);

    return (
        <div className=" flex items-center justify-start px-[20%] gap-5 h-[10vh] relative ">
            <i
                 onClick={toggleSidebar}
                class="ri-align-justify z-[46] text-3xl hidden max-md:block text-white absolute top-0 left-5 max-[425px]:left-2  max-[425px]:text-2xl  max-[375px]:left-0"
            ></i>
            <i className="nav-search_animate text-3xl text-zinc-300 ri-search-line"></i>
            <input
                onChange={(e) => setquery(e.target.value)}
                value={query}
                className="nav-search_animate w-[50%] outline-none border-none bg-transparent text-zinc-300"
                type="text"
                placeholder="Search..."
            />
            {query.length > 0 && (
                <i onClick={() => setquery("")} className="cursor-pointer text-3xl text-zinc-300 ri-close-line"></i>
            )}

            <div className="rounded-lg max-h-[50vh] overflow-auto bg-zinc-200 w-[34vw]  absolute top-[90%] max-:w-[40vw]">
                {searches.map((e, i) => (
                    <Link
                        to={`/${e.media_type}/details/${e.id}`}
                        className="my-5 hover:text-black hover:font-semibold bg-zinc-200 text-zinc-600 flex justify-start items-center w-[100%] h-[15vh] p-6 border-b-2 border-zinc-100"
                    >
                        <img
                            className="mr-10 w-[10vh] h-[10vh] object-cover rounded"
                            src={
                                e.backdrop_path || e.profile_path
                                    ? `https://image.tmdb.org/t/p/original/${e.backdrop_path || e.profile_path}`
                                    : noimage
                            }
                            alt=""
                        />
                        <span className="text-md text-start">
                            {e.name || e.title || e.original_names || e.original_title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default topnav;
