import React from "react";
import ReactPlayer from "react-player";
import {useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytVideo = useSelector((state) => state[category].info.videos);
    console.log(ytVideo);
    return (
        <div
            // onClick={() => navigate(-1)}
            className="flex items-center justify-center z-10 absolute left-0 top-0 h-screen w-screen bg-[rgba(0,0,0,0.8)]"
        >
            <Link
                to={navigate}
                onClick={() => navigate(-1)}
                className="hover:text-[#6952ff] text-white text-5xl absolute top-[5%] right-[5%] cursor-pointer ri-close-fill"
            ></Link>
            {ytVideo ? (
                <ReactPlayer height={500} width={1000} url={`https://www.youtube.com/watch?v=${ytVideo.key}`} />
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Trailer;
