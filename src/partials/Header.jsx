import {Link} from "react-router-dom";
import Loading from "./Loading";

function Header({data}) {
    return data ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path || data.poster_path
                })`,
                backgroundSize: "cover",

                backgroundPosition: "center",
            }}
            className="w-full h-[50vh] text-white flex items-start  justify-end p-[5%] flex-col "
        >
            <h1 className={"text-5xl font-semibold w-[70%]  text-white"}>
                {data.original_title || data.name || data.original_name || data.title}
            </h1>
            <p className="mt-4 w-[60%] text-start">
                {data.overview.slice(0, 200)}...<Link className="text-blue-500">More</Link>
            </p>
            <p className="mt-3">
                <i className="ri-megaphone-fill text-yellow-400"></i> {data.release_date || "Not Found😶"}{" "}
                <i className="text-yellow-400 ml-2 ri-album-fill"></i> {data.media_type}
            </p>
            <Link className="bg-[#6556CD] p-4 mt-4 rounded">Play Trailer</Link>
        </div>
    ) : <Loading/>
}

export default Header;
