import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncLoadMovie, removeMovie} from "../store/actions/movieActions";
import {Link, useNavigate, useParams} from "react-router-dom";
import Loading from "../partials/Loading";

const Moviedetails = () => {
    const {info} = useSelector((state) => state.movie);
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    console.log(info);

    useEffect(() => {
        dispatch(asyncLoadMovie(id));
        return () => {
            dispatch(removeMovie());
        };
    }, [dispatch, id]);

    return info ? (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
                backgroundSize: "cover",

                backgroundPosition: "center",
            }}
            className="w-screen h-screen px-[10%]"
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
            <div className="w-full ">
                <img
                    className="h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded"
                    src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                    alt=""
                />
            </div>

{/* Part 3 paltforms secrion */}


            <div className="w-[80%] ">
                <div className="flex flex-col gap-5 mt-5">
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
        </div>
    ) : (
        <Loading />
    );
};

export default Moviedetails;
