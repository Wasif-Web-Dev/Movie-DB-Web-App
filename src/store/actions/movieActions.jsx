export {removeMovie} from "../reducers/movieSlice";
import axios from "../../utils/axios";

import {loadMovie} from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalId = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchProvider = await axios.get(`/movie/${id}/watch/providers`);

        let theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m => m.type === "Trailer"),
            watchProvider: watchProvider.data.results.IN,
        };
        dispatch(loadMovie(theUltimateData))
        // console.log(theUltimateData)
    } catch (error) {
        console.log("Error :", error);
    }
};
