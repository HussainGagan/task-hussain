import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import SliderContainer from "./SliderContainer";

function NowPlaying() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDataFromApi("/trending/all/week").then((res) => {
      setData(res.results);
    });
  }, []);

  return (
    <section className="container relative  pb-20">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block h-7 w-1 rounded-md bg-yellow"></span>
        <h3 className="text-2xl font-bold text-white">Now Playing</h3>
      </div>
      <SliderContainer data={data} />
    </section>
  );
}

export default NowPlaying;
