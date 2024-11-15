import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytVideo = useSelector((state) => state[category].info.videos);
    
    return (
        <div
            className="flex items-center justify-center z-10 absolute left-0 top-0 h-screen w-screen overflow-hidden bg-[rgba(0,0,0,0.8)]"
        >
            <Link
                to={navigate}
                onClick={() => navigate(-1)}
                className="hover:text-[#6952ff] text-white text-5xl absolute top-4 right-4 cursor-pointer ri-close-fill"
            ></Link>
            {ytVideo ? (
                <div className="w-[80vw] h-[80vh] max-tabletM:h-[50vh] max-tabletM:w-[90vw] max-mobileL:h-[40vh] max-mobileM:h-[30vh] flex items-center justify-center">
                    <ReactPlayer
                        controls
                        width="100%"
                        height="100%"
                        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
                        className="max-w-full max-h-full"
                    />
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Trailer;
