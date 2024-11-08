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
            className="w-full h-max px-[10%] relative object-cover"
        >
            {/* Part 1 nav */}
            <nav className="h-[10vh] flex items-center gap-10 text-zinc-100">
                <Link>
                    {" "}
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
                    className=" hover:text-[#6952ff] text-xl cursor-pointer"
                >
                    imdb
                </a>
            </nav>
            {/* Part 2 image section */}
            <div className="w-full flex">
                <img
                    className="h-[60vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded"
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                    alt=""
                />
                <div className="content ml-[5%] ">
                    <h1 className="text-5xl text-white font-black       ">
                        {info.detail.original_title ||
                            info.detail.name ||
                            info.detail.original_name ||
                            info.detail.title}
                        <span className="text-2xl font-zinc-400 font-bold ">
                            ({info.detail.first_air_date.split("-")[0]})
                        </span>
                    </h1>
                    <div className="flex items-center text-white gap-x-5 mt-3">
                        <span className="text-white text-xl  h-[6vh] w-[6vh] bg-yellow-500 flex items-center justify-center rounded-full">
                            <h1>{(info.detail.vote_average * 10).toFixed()}</h1>
                            <sup>%</sup>
                        </span>
                        <h1 className="font-semibold text-xl w-[50px] leading-5 ml-[-15px]">User Score</h1>
                        <h1 className="font-semibold">{info.detail.first_air_date}</h1>
                        <h1 className="font-semibold">{info.detail.genres.map((g) => g.name).join()}</h1>
                        {info.detail.seasons ? (
                            <h1 className="font-semibold">
                                {info.detail.seasons.length} {info.detail.seasons.length > 1 ? "seasons" : "season"}
                            </h1>
                        ) : (
                            "<h1> </h1>"
                        )}
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-3">{info.detail.tagline}</h1>

                    <div className="text-white">
                        <h1 className="text-white text-3xl font-semibold mt-3">Overview</h1>
                        <p className="">{info.detail.overview}</p>
                    </div>
                    <div className="text-white">
                        <h1 className="text-white text-3xl font-semibold mt-3">Translated Languages</h1>
                        <p className="mb-7">{info.translations.join(", ")}</p>
                        <Link to={`${pathname}/trailer`} className="bg-[#6556CD] px-7 py-3 rounded">
                            {" "}
                            <i class="ri-play-fill"></i> Play Trailer
                        </Link>
                    </div>
                </div>
            </div>
            {/* part 3 platforms*/}

            <div className="w-[80%] ">
                <div className="flex flex-col gap-5 mt-8">
                    {info.watchProvider && info.watchProvider.flatrate && (
                        <div className="flex gap-x-10 items-center text-white">
                            <h1 className="text-2xl uppercase">Available on Platforms</h1>
                            {info.watchProvider.flatrate.map((m) => (
                                <img
                                    title={m.provider_name}
                                    className="w-[5vh] h-[5vh] rounded"
                                    src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.buy && (
                        <div className="flex gap-x-10 items-center text-white">
                            <h1 className="text-2xl uppercase">Available to Buy</h1>
                            {info.watchProvider.buy.map((m) => (
                                <img
                                    title={m.provider_name}
                                    className="w-[5vh] h-[5vh] rounded"
                                    src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                    {info.watchProvider && info.watchProvider.rent && (
                        <div className="flex gap-x-10 items-center text-white">
                            <h1 className="text-2xl uppercase">Abailable for Rent</h1>
                            {info.watchProvider.rent.map((m) => (
                                <img
                                    title={m.provider_name}
                                    className="w-[5vh] h-[5vh] rounded"
                                    src={`https://image.tmdb.org/t/p/original/${m.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* seasons */}
            <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-100" />
            <h1 className="text-white font-black text-2xl">Seasons</h1>
            <div className="w-full   overflow-x-auto">
                {" "}
                <div className="w-max h-[48vh]  flex px-[1%] gap-3 items-center justify-start">
                    {info.detail.seasons.map((e, i) => (
                        <Link
                            to={`/${e.media_type || "tv"}/details/${e.id}`}
                            key={i}
                            className="min-w-[10%] h-[40vh] m-5 mb-5  rounded"
                        >
                            <img
                                className="w-full h-[80%] object-cover center rounded"
                                src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
                                alt=""
                            />
                            <div className="h-[20%] p-3 text-white">
                                <h1 className={"text-xl  font-semibold"}>
                                    {e.original_title || e.name || e.original_name || e.title}
                                </h1>   
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* part 4 recommendations and similars */}
            <hr className=" mb-5 border-none h-[2px] bg-zinc-100" />
            <h1 className="text-white font-black text-2xl">Recommendations And similar Stuff</h1>
            <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
            <Outlet />
        </div>
    ) : (
        <Loading />
    );
};

export default Tvdetails;
