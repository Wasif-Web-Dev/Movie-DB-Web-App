import React, {useRef} from "react";
import {Link} from "react-router-dom";
import noimage from "../../public/noimage.webp";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

function HorizontalCards({data}) {
    const HcardsRef = useRef(null);
    const tl = new gsap.timeline();
    useGSAP(() => {
        tl.from(HcardsRef.current, {
            opacity: 0,
            x: -3000,
            duration: 3,
            stagger: 0.3,
            ease: "power2.out",
        });
    });

    return (
        <div ref={HcardsRef} className="w-full  flex overflow-y-hidden mb-5">
            {data.map((d, i) => (
                <Link
                    to={`/${d.media_type || "tv"}/details/${d.id}`}
                    key={i}
                    className="overflow-hidden max-md:min-w-[23%]  rounded-xl max-[450px]:min-w-[35%] max-[380px]:min-w-[40%] max-[320px]:h-[55vh max-md:h-[40vh] max-mobileL:h-[30vh] max-sm:min-w-[30%] min-w-[16%] h-[42vh] max-sm:mr-2 max-mobileL:m-2 m-5 bg-zinc- 00 max-tabletM:bg-transparent mr-5 mb-5 shado shadow-[rgba(0,0,0,0.9)] max-tabletM:overflow-hidden max-tabletM:shadow-none"
                >
                    <img
                        className="w-full h-[60%] object-cover max-tabletM:h-[70%] rounded-xl"
                        src={
                            d.backdrop_path || d.profile_path
                                ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`
                                : noimage
                        }
                        alt=""
                    />
                    <div className="h-[40%] p-2 text-white max-tabletM:h-[10%]">
                        <h1 className="text-xl  font-semibold max-mobileL:text-base max-tabletM:text-lg max-mobileL:font-thin max-tabletM:text-center">
                            {d.original_title || d.name || d.original_name || d.title}
                        </h1>
                        <p className=" max-tabletM:hidden max-mobileL:hidden  w-full">
                            {d.overview.slice(0, 60)}...<Link className="text-zinc-200 text-sm leading-none">More</Link>
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HorizontalCards;
