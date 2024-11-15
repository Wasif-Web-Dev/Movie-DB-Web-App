import React, {useRef} from "react";
import "../index.css";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

function DropDown({title, option, func}) {
    const tl = new gsap.timeline();
    const dropTitleRef = useRef(null);
    useGSAP(() => {
        gsap.from(dropTitleRef.current, {
            // y:200,
            opacity: 0,
            duration: 1.5,
            ease: "power4.inOut",
        });
    });

    return (
        <div>
            <select
                className="max-sm:w-[100px] max-sm:p-1"
                ref={dropTitleRef}
                defaultValue="0"
                onChange={func}
                name="format"
                id="format"
            >
                <option disabled value={0}>
                    {title}
                </option>
                {option.map((o, i) => (
                    <option key={i} value={o}>
                        {o.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDown;
