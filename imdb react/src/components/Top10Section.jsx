import { useEffect, useState } from "react";
import SliderContainer from "./SliderContainer";
import { fetchDataFromApi } from "../utils/api";

function Top10Section() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDataFromApi("/trending/all/week").then((res) => {
      setData(res.results.slice(10));
    });
  }, []);

  return (
    <section id="top10" className="container relative pb-24">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-7 w-1 rounded-md bg-yellow"></span>
        <h3 className="text-2xl font-bold text-white">
          Top 10 on IMDb this week
        </h3>
      </div>
      <SliderContainer data={data} />
    </section>
  );
}

export default Top10Section;
