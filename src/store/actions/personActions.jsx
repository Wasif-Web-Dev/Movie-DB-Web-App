export {removeperson} from "../reducers/personSlice";
import axios from "../../utils/axios";

import {loadperson} from "../reducers/personSlice";

export const asyncLoadperson = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);

        let theUltimateData = {
            detail: detail.data,
            externalId: externalId.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data,
            combinedCredits: combinedCredits.data,
        };
        dispatch(loadperson(theUltimateData));
        // console.log(theUltimateData);
    } catch (error) {
        console.log("Error :", error);
    }
};
