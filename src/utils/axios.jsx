import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDQ1ZWY1NTAzMjNjOTQ4ZWJkN2Y2ZTAwM2I2M2I3NSIsIm5iZiI6MTczMDExMjA3MS44MjQzNTUsInN1YiI6IjY3MWY1YjlmNDI3YzVjMTlmMDI2NmU5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uxFWJ2Io2iFUgoP0aWdVnNK1R3r0xYrGd4iJKPpzMMk",
    },
});

export default instance;
