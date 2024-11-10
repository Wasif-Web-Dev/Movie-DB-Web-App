import {Link} from "react-router-dom";
import Loading from "./Loading";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function Header({data}) {
    const HeaderRef = useRef(null);
    const textRef = useRef(null);
    useGSAP(() => {
        gsap.from(HeaderRef.current, {
            opacity: 0,
            duration: 2,
            delay: 1,
        });
        gsap.from(textRef.current, {
            x: -300,
            duration: 2,
        });
        gsap.from(".date-animation", {
            opacity: 0,
            duration: 1.5,
            delay: 1,
        });
    });
    return data ? (
        <div
            ref={HeaderRef}
            style={{
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path || data.poster_path
                })`,
                backgroundSize: "cover",

                backgroundPosition: "center",
            }}
            className="animate-Header w-full h-[50vh] text-white flex items-start  justify-end p-[5%] flex-col "
        >
            <h1 ref={textRef} className={"text-5xl font-semibold w-[70%]  text-white"}>
                {data.original_title || data.name || data.original_name || data.title}
            </h1>
            <p ref={textRef} className="mt-4 w-[60%] text-start">
                {data.overview.slice(0, 200)}...
                <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-500">
                    More
                </Link>
            </p>
            <p className="mt-3 date-animation">
                <i className=" ri-megaphone-fill text-yellow-400 "></i> {data.release_date || "Not Found😶"}{" "}
                <i className="text-yellow-400 ml-2 ri-album-fill"></i> {data.media_type}
            </p>
            <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] p-4 mt-4 rounded">
                Play Trailer
            </Link>
        </div>
    ) : (
        <Loading />
    );
}

export default Header;
