import React from "react";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Contact from "./components/Contact";
import Moviedetails from "./components/Moviedetails";
import Tvdetails from "./components/Tvdetails";
import Persondetails from "./components/Persondetails";
import Trailer from "./partials/Trailer";
import NotFound from "./partials/NotFound";

function App() {
    return (
        <div className="bg-[#1F1E24] h-screen flex">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/movie/details/:id" element={<Moviedetails />}>
                    <Route path="/movie/details/:id/trailer" element={<Trailer />} />
                </Route>
                <Route path="/tv-shows" element={<Tvshows />} />
                <Route path="/tv/details/:id" element={<Tvdetails />}>
                    <Route path="/tv/details/:id/trailer" element={<Trailer />} />
                </Route>

                <Route path="/people" element={<People />} />
                <Route path="/person/details/:id" element={<Persondetails />} />

                <Route path="/Contact" element={<Contact />} />
                <Route path="/About" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
