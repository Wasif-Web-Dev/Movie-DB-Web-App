import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {asyncLoadperson, removeperson} from "../store/actions/personActions";
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Loading from "../partials/Loading";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/DropDown";

const persondetails = () => {
    const [category, setcategory] = useState("movie");
    const {pathname} = useLocation();
    const {info} = useSelector((state) => state.person);
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        dispatch(asyncLoadperson(id));
        return () => {
            dispatch(removeperson());
        };
    }, [id]);

    return info ? (
        <div className="px-[5%] h-[300vh] max-tabletM:h-[390vh]  max-tabletS:h-[420vh] max-mobileXL:h-[470vh]  max-mobileL:h-[500vh] max-mobileS:h-[550vh] bg-[#1F1E24] w-screen">
            {/* part 1 nav */}
            <nav className="h-[10vh] flex items-center gap-10 text-zinc-100">
                <Link>
                    {" "}
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6952ff] text-xl cursor-pointer ri-arrow-left-fill"
                    ></i>
                </Link>
            </nav>
            <div className="flex  max-tabletM:flex-col max-tabletM:items-center max-tabletM:justify-center">
                <div className="w-[30%] flex flex-col max-tabletM:w-[90vw]">
                    {/* part 2 poster left*/}

                    <img
                        className="h-[40vh] max-tabletM:h-[60vh]  object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded"
                        src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                        alt=""
                    />

                    <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-100" />
                    {/* social links */}
                    <div className="flex items-center gap-x-7 text-2xl text-white">
                        <a
                            href={
                                info.externalId.wikidata_id
                                    ? `https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`
                                    : undefined
                            }
                            onClick={(e) => {
                                if (!info.externalId.wikidata_id) {
                                    e.preventDefault(); // Prevents navigation if ID is not found
                                    alert("ID not found");
                                }
                            }}
                            target="_blank"
                        >
                            <i className="hover:text-[#6952ff] text-xl cursor-pointer ri-earth-fill"></i>
                        </a>
                        <a
                            onClick={(e) => {
                                if (!info.externalId.instagram_id) {
                                    e.preventDefault(); // Prevents navigation if ID is not found
                                    alert("ID not found");
                                }
                            }}
                            target="_blank"
                            href={
                                info.externalId.instagram_id
                                    ? ` https://www.instagram.com/${info.externalId.instagram_id}`
                                    : undefined
                            }
                        >
                            <i className="hover:text-[#6952ff] text-xl cursor-pointer ri-instagram-fill"></i>
                        </a>
                        <a
                            onClick={(e) => {
                                if (!info.externalId.facebook_id) {
                                    e.preventDefault(); // Prevents navigation if ID is not found
                                    alert("ID not found");
                                }
                            }}
                            target="_blank"
                            href={
                                info.externalId.facebook_id
                                    ? `https://www.facebook.com/${info.externalId.facebook_id}`
                                    : undefined
                            }
                            className=" hover:text-[#6952ff] text-xl cursor-pointer"
                        >
                            <i className="ri-facebook-fill"></i>
                        </a>
                        <a
                            onClick={(e) => {
                                if (!info.externalId.twitter_id) {
                                    e.preventDefault(); // Prevents navigation if ID is not found
                                    alert("ID not found");
                                }
                            }}
                            target="_blank"
                            href={
                                info.externalId.twitter_id
                                    ? `https://www.x.com/${info.externalId.twitter_id}`
                                    : undefined
                            }
                            className=" hover:text-[#6952ff] text-xl cursor-pointer"
                        >
                            <i className="ri-twitter-fill"></i>
                        </a>
                    </div>

                    {/* Personal informaion */}

                    <h1 className="text-2xl text-zinc-400 font-semibold my-5">Personal Info</h1>

                    <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Known as</h1>
                    <h1 className="text-xl text-zinc-400 f">{info.detail.known_for_department}</h1>

                    <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Gender</h1>
                    <h1 className="text-xl text-zinc-400 f">{info.detail.gender === 2 ? "Male" : "Female"}</h1>

                    <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Birthday</h1>
                    <h1 className="text-xl text-zinc-400 f">{info.detail.birthday}</h1>

                    <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Death Day</h1>
                    <h1 className="text-xl text-zinc-400 f">
                        {info.detail.deathday ? info.detail.deathday : "Still Alive"}
                    </h1>
                    <h1 className="text-2xl text-zinc-400 font-semibold mt-3">Also Known As</h1>
                    <h1 className="text-xl text-zinc-400 f">{info.detail.also_known_as}</h1>
                </div>

                <div className="w-[80%] ml-[3%] max-tabletM:w-[95vw] max-tabletM:ml-0">
                    <h1 className=" text-5xl text-zinc-400 font-semibold my-5">{info.detail.name}</h1>
                    <h1 className=" text-xl text-zinc-400 font-semibold my-5">Biography</h1>
                    <div>
                        {/* Full text for desktop */}
                        <p className="text-zinc-500 hidden md:block">{info.detail.biography}</p>

                        {/* Truncated text for tablets */}
                        <p className="text-zinc-500 block md:hidden">
                            {isExpanded
                                ? info.detail.biography
                                : info.detail.biography.split(" ").slice(0, 50).join(" ")}
                            {!isExpanded && (
                                <span className="text-[#6556CD] cursor-pointer" onClick={handleToggle}>
                                    ...more
                                </span>
                            )}
                            {isExpanded && (
                                <span className="text-[#6556CD] cursor-pointer" onClick={handleToggle}>
                                    ...less
                                </span>
                            )}
                        </p>
                    </div>
                    {/* <div>
                        {/* Full text for desktop *
                        <p className="text-zinc-500 hidden md:block">{info.detail.biography}</p>

                        {/* Truncated text for tablets 
                        <p className="text-zinc-500 block md:hidden">
                            {info.detail.biography.split(" ").slice(0, 50).join(" ")}
                            <span className="text-[#6556CD]">...more</span>
                        </p>
                    </div> */}

                    <h1 className=" text-xl text-zinc-400 font-semibold my-5">Known For</h1>
                    <HorizontalCards data={info.combinedCredits.cast} />
                    <div className="flex justify-between w-full">
                        <h1 className=" text-2xl text-zinc-400 font-semibold my-5">Acting</h1>
                        <Dropdown title="category" option={["tv", "movie"]} func={(e) => setcategory(e.targer.value)} />
                    </div>
                    <div className="list-disc w-full h-[50vh] shadow-xl overflow-x-hidden overflow-y-auto p-5 shadow-[rgba(255,255,255,0.3)] text-white">
                        {info[category + "Credits"].cast.map((c, i) => (
                            <li className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 rounded mt-5 p-5 duration-300">
                                <Link className="" key={i} to={`/${category}/details/${c.id}`}>
                                    <span> {c.original_title || c.name || c.original_name || c.title}</span>
                                    <span className="ml-5 block mt-2">
                                        {c.character && `Character Name: ${c.character}`}{" "}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default persondetails;
