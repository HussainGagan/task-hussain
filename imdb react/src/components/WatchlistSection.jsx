import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { watchListState } from "../recoilState";
import SliderContainer from "./SliderContainer";

/* eslint-disable react/prop-types */
const WatchlistSection = ({ user }) => {
  const watchlist = useRecoilValue(watchListState) || [];

  return (
    <section className="container relative pb-24">
      <a href="#" className="ww mb-8 flex items-center gap-2 text-white">
        <span className="inline-block h-7 w-1 rounded-md bg-yellow"></span>
        <h3 className="text-2xl font-bold">From your Watchlist</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </a>
      {watchlist.length > 0 ? (
        <>
          <h3 className="mb-5 mt-[-24px] text-grey">
            Movies and TV shows that you have watchlisted
          </h3>
          <SliderContainer data={watchlist} />
        </>
      ) : (
        <>
          <div
            id="watchlist-items"
            className="flex flex-col items-center gap-5 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-11 w-11"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <div className="mb-3">
              <h4 className="text-center font-semibold">
                {!user
                  ? "Sign in to access your Watchlist"
                  : "No available releases"}
              </h4>
              <h4 id="watchlist-text2">
                {!user
                  ? "Save shows and movies to keep track of what you want to watch."
                  : "Add more shows and movies to keep track of what you want to watch."}
              </h4>
            </div>
            {!user ? (
              <Link
                to="/login"
                className="rounded-md bg-carousel px-8 py-2 text-sm font-semibold text-blue-500 hover:bg-[#191e25]"
              >
                Sign in to IMDb
              </Link>
            ) : (
              <a
                href="#topPicks"
                className="rounded-md bg-carousel px-8 py-2 text-sm font-semibold text-blue-500 hover:bg-[#191e25]"
              >
                Browse popular movies
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default WatchlistSection;
