import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {asyncLoadMovie, removeMovie} from "../store/actions/movieActions";
import {useParams} from "react-router-dom";

const Moviedetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asyncLoadMovie(id));
        return ()=>{
          dispatch(removeMovie())
        }
    });

    return <div>Moviedetails</div>;
};

export default Moviedetails;
