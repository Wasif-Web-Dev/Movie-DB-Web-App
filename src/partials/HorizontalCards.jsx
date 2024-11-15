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
                    className="overflow-y-auto max-md:min-w-[23%] rounded-xl max-[450px]:min-w-[35%] max-[380px]:min-w-[40%] max-[320px]:h-[45vh] max-md:h-[40vh] max-mobileL:h-[30vh] max-sm:min-w-[30%] min-w-[16%] h-[35vh] max-sm:mr-2  m-5 bg-zinc-900 mr-5 mb-5 shadow-md shadow-[rgba(0,0,0,0.9)]"
                >
                    <img
                        className="w-full h-[40%] object-cover"
                        src={
                            d.backdrop_path || d.profile_path
                                ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path}`
                                : noimage
                        }
                        alt=""
                    />
                    <div className="h-[60%] p-2 text-white">
                        <h1 className={"text-xl  font-semibold"}>
                            {d.original_title || d.name || d.original_name || d.title}
                        </h1>
                        <p className="mt-  w-full">
                            {d.overview.slice(0, 30)}...<Link className="text-zinc-200">More</Link>
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HorizontalCards;
