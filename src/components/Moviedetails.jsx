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
            <div className="h-[10vh] flex items-center gap-10 text-zinc-100">
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
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Moviedetails;
