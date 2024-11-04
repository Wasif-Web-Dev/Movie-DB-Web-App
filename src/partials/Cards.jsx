import React from "react";
import {Link} from "react-router-dom";

const Cards = ({data, title}) => {
    return (
        <div className="w-ful flex flex-wrap  bg-[#1E1D23] px-[3%] items-center justify-center">
            {data.map((c, i) => (
                <Link to={`/${data.media_type || title }/details/${c.id}`} className="w-[25vh] h-[45vh] relative  overflow-hidden mb-[3%] mr-[5%]  " key={i}>
                    <img
                        className="h-[40vh] w-full object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
                        src={`https://image.tmdb.org/t/p/original/${
                            c.poster_path || c.backdrop_path || c.profile_path
                        }`}
                        alt=""
                    />
                    <h1 className="text-2xl mt-1 text-zinc-300">
                        {c.original_title || c.name || c.original_name || c.title}
                    </h1>

                    {c.vote_average && (
                        <div className="text-white text-xl absolute right-0 bottom-11 h-[6vh] w-[6vh] bg-yellow-500 flex items-center justify-center rounded-full">
                            <h1>{(c.vote_average * 10).toFixed()}</h1>
                            <sup>%</sup>
                        </div>
                    )}
                </Link>
            ))}
        </div>
    );
};

export default Cards;



