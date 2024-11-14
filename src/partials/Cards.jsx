import React from "react";
import {Link} from "react-router-dom";
import Loading from "./Loading";

const Cards = ({data, title}) => {
    return data ? (
        <div className="w-ful flex flex-wrap mt-5 bg-[#1E1D23] px-[3%] max-sm:px-[1%] items-center justify-center">
            {data.map((c, i) => (
                <Link
                    to={`/${c.media_type || title}/details/${c.id}`}
                    className="w-[25vh] h-[45vh]  max-sm:w-[15vh] max-sm:h-[30vh] max-mobileL:w-[12vh] max-mobileM:w-[10vh] max-mobileM:h-[22vh] relative  overflow-hidden mb-[3%] mr-[5%]  "
                    key={i}
                >
                    <img
                        className="h-[40vh] rounded-xl  max-sm:h-[25vh] max-mobileM:h-[15vh] w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                        src={`https://image.tmdb.org/t/p/original/${
                            c.poster_path || c.backdrop_path || c.profile_path
                        }`}
                        alt=""
                    />
                    <h1 className="text-2xl  max-sm:text-sm mt-1 max-mobileM:mt-0 text-zinc-300">
                        {c.original_title || c.name || c.original_name || c.title}
                    </h1>

                    {c.vote_average && (
                        <div className="max-mobileM:bottom-8 text-white text-xl absolute right-0 bottom-11 h-[6vh] w-[6vh] max-sm:h-[4vh] max-sm:w-[4vh] max-sm:text-sm bg-yellow-500 flex items-center justify-center rounded-full">
                            <h1>{(c.vote_average * 10).toFixed()}</h1>
                            <sup>%</sup>
                        </div>
                    )}
                </Link>
            ))}
        </div>
    ) : (
        <Loading />
    );
};

export default Cards;
