// import "./App.module.css";
// import { Route, Routes } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import { Navbar } from "./Navbar/Navbar";
// import { MovieCast } from "./MovieCast/MovieCast";
// import MovieReviews from "../components/MovieReviews/MovieReviews.jsx";

import "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import MovieCast from "../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../components/MovieReviews/MovieReviews.jsx";

import { Loader } from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage.jsx"));
const MoviePage = lazy(() => import("../pages/MoviesPage.jsx"));

export default function App() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
