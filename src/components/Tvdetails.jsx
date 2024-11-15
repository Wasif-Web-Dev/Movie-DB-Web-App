import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncLoadtv, removetv} from "../store/actions/tvActions";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../partials/Loading";
import HorizontalCards from "../partials/HorizontalCards";

const Tvdetails = () => {
    const {pathname} = useLocation();
    const {info} = useSelector((state) => state.tv);
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    console.log(info);

    useEffect(() => {
        dispatch(asyncLoadtv(id));
        return () => {
            dispatch(removetv());
        };
    }, [id]);

    return info ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="w-full h-max px-[10%] max-tabletM:px-[2%] relative object-cover"
        >
            {/* Part 1 nav */}
            <nav className="h-[10vh] flex items-center gap-10 text-zinc-100">
                <Link>
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] text-xl cursor-pointer ri-arrow-left-fill"
                    ></i>
                </Link>
                <a target="_blank" href={info.detail.homepage}>
                    <i className="hover:text-[#6952ff] text-xl cursor-pointer ri-earth-fill"></i>
                </a>
                <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}>
                    <i className="hover:text-[#6952ff] text-xl cursor-pointer ri-external-link-fill"></i>
                </a>
                <a
                    target="_blank"
                    href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
                    className="hover:text-[#6952ff] text-xl cursor-pointer"
                >
                    imdb
                </a>
            </nav>
            {/* Part 2 image section */}
            <div className="w-full flex max-tabletS:flex-col max-tabletS:px-[12%] max-mobileM:px-[3%]">
                <img
                    className="h-[60vh] max-tabletM:h-[80vh] max-tabletS:w-[90vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded max-tabletS:rounded-xl"
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                    alt=""
                />
                <div className="content ml-[5%] max-tabletM:ml-[1%] max-tabletS:mt-[10%]">
                    <h1 className="text-5xl text-white font-black max-tabletM:text-3xl">
                        {info.detail.original_title ||
                            info.detail.name ||
                            info.detail.original_name ||
                            info.detail.title}
                        <span className="text-2xl font-zinc-400 font-bold max-tabletM:text-xl">
                            ({info.detail.first_air_date.split("-")[0]})
                        </span>
                    </h1>
                    <div className="flex items-center text-white gap-x-5 max-tabletM:justify-between max-tabletM:flex-wrap max-mobileM:mt-[10%]">
                        <span className="text-white text-xl h-[6vh] w-[6vh] bg-yellow-500 flex items-center justify-center rounded-full">
                            <h1>{(info.detail.vote_average * 10).toFixed()}</h1>
                            <sup>%</sup>
                        </span>
                        <h1 className="font-semibold text-xl w-[50px] leading-5 ml-[-15px]">User Score</h1>
                        <h1 className="font-semibold">{info.detail.first_air_date}</h1>
                        <h1 className="font-semibold">{info.detail.genres.map((g) => g.name).join()}</h1>
                        {info.detail.seasons ? (
                            <h1 className="font-semibold max-mobileM:mt-[3%]">
                                {info.detail.seasons.length} {info.detail.seasons.length > 1 ? "seasons" : "season"}
                            </h1>
                        ) : (
                            <h1> </h1>
                        )}
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-3 max-tabletM:text-xl">
                        {info.detail.tagline}
                    </h1>

                    <div className="text-white">
                        <h1 className="text-white text-3xl font-semibold mt-3 max-tabletM:text-2xl">Overview</h1>
                        <p className="max-tabletM:text-sm">{info.detail.overview}</p>
                    </div>
                </div>
            </div>
            {/* Part 3: recommendations and similar shows */}
            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-100" />
            <h1 className="text-white font-black text-2xl">Recommendations And similar Stuff</h1>
            <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
            <Outlet />
        </div>
    ) : (
        <Loading />
    );
};

export default Tvdetails;
