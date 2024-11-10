import React from "react";
import {Link} from "react-router-dom";
import noimage from "../../public/noimage.webp";

function HorizontalCards({data}) {
    return (
        <div className="w-full  flex overflow-y-hidden mb-5">
            {data.map((d, i) => (
                <Link
                    to={`/${d.media_type || "tv"}/details/${d.id}`}
                    key={i}
                    className="overflow-y-auto  min-w-[20%] h-[35vh] m-5 bg-zinc-900 mr-5 mb-5"
                >
                    <img
                        className="w-full h-[50%] object-cover"
                        src={
                            d.backdrop_path || d.profile_path
                                ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`
                                : noimage
                        }
                        alt=""
                    />
                    <div className="h-[50%] p-3 text-white">
                        <h1 className={"text-xl  font-semibold"}>
                            {d.original_title || d.name || d.original_name || d.title}
                        </h1>
                        <p className="mt-2  w-full">
                            {d.overview.slice(0, 50)}...<Link className="text-zinc-200">More</Link>
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HorizontalCards;
