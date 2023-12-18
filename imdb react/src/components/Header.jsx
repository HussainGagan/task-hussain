/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

function Header({ user }) {
  // console.log(user);
  const navigate = useNavigate();
  return (
    <header className="bg-nav">
      <div className="container relative flex items-center justify-center gap-2 px-0 py-3">
        <a href="/">
          <img className="h-8 w-16" src="imdb-logo.png" alt="Logo Image" />
        </a>
        <button className="flex items-center gap-1 rounded-md px-4 py-1 text-white hover:bg-darkGrey">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <span className="text-sm font-semibold">Menu</span>
        </button>
        <div className="search-box flex w-1/2 items-center rounded-md bg-white">
          <div
            id="search-result-container"
            className="absolute left-52 top-14 z-50 w-1/2 rounded-md bg-carousel"
          >
            {/* <!-- SEARCH RESULT TEMPLATE WILL BE INSERTED HERE --> */}
            {/* <!-- <div
              className="flex items-center gap-4 border-b-[1px] border-b-[#575757] p-3"
            >
              <div className="skeleton h-[72px] w-12"></div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="skeleton h-4 w-1/5 rounded-sm"></div>
                <div className="skeleton mb-1 h-3 w-1/12 rounded-sm"></div>
                <div className="skeleton h-3 w-1/2 rounded-sm"></div>
              </div>
            </div> --> */}
          </div>
          <input
            type="text"
            id="search-input"
            className="search-input flex-1"
            placeholder="Search IMDb"
          />
          <button className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-lightGrey"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <a href="#" className="rounded-md hover:bg-darkGrey">
          <img
            src="imdbpro-logo.png"
            alt="imdb pro logo"
            className="w-[84px]"
          />
        </a>
        <span className="inline-block h-8 w-[2px] bg-darkGrey2"></span>
        <a
          href="#"
          className="flex items-center gap-1 rounded-md px-4 py-2 text-white hover:bg-darkGrey"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>

          <span className="text-sm font-semibold">Watchlist</span>
        </a>
        {user ? (
          <button
            onClick={async () => {
              await signOut(auth);
              navigate("/login");
            }}
            className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-darkGrey"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-block rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-darkGrey"
          >
            Sign In
          </Link>
        )}
        <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-darkGrey">
          <span>EN</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
