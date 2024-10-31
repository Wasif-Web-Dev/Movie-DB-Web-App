import React from "react";
import {CircleLoader} from "react-spinners";
import gif from "../../public/giphy-2.gif";

const Loading = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center text-white  text-5xl bg-[#000000]">
            <img src={gif} alt="" />
            {/* <video className='w-screen h-screen' src={gif} autoPlay loop muted></video> */}
            {/* <h1 className='text-4xl text-white'>Loading</h1> */}
        </div>
    );
};

export default Loading;
