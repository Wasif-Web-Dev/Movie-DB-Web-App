export {removetv} from "../reducers/tvSlice";
import axios from "../../utils/axios";

import {loadtv} from "../reducers/tvSlice";

export const asyncLoadtv = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalId = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchProvider = await axios.get(`/tv/${id}/watch/providers`);

        let theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map((t) => t.name),
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchProvider: watchProvider.data.results.IN,
        };
        dispatch(loadtv(theUltimateData));
        // console.log(theUltimateData)
    } catch (error) {
        console.log("Error :", error);
    }
};
