import { useEffect, useState } from "react";
import SliderContainer from "./SliderContainer";
import { fetchDataFromApi } from "../utils/api";

function TopPicksSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/movie/top_rated"),
      fetchDataFromApi("/tv/top_rated"),
    ]).then((res) => {
      const topRatedMovieAndTV = res[0].results
        .slice(0, 12)
        .concat(res[1].results.slice(0, 12));
      setData(topRatedMovieAndTV);
    });
  }, []);

  return (
    <section id="topPicks" className="container relative pb-20 pt-8">
      {/* <div className="arrow arrow-left">
        <img src="left-arrow.svg" alt="left arrow" />
      </div>
      <div className="arrow arrow-right">
        <img src="right-arrow.svg" alt="right arrow" />
      </div> */}
      <h3 className="mb-7 text-[2rem] font-bold text-yellow">What to watch</h3>
      <a href="#" className="ww mb-2 flex items-center gap-2 text-white">
        <span className="inline-block h-7 w-1 rounded-md bg-yellow"></span>
        <h3 className="text-2xl font-bold">Top picks</h3>
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
      <h3 className="mb-4 text-grey">TV shows and movies just for you</h3>
      <SliderContainer data={data} />
    </section>
  );
}

export default TopPicksSection;
