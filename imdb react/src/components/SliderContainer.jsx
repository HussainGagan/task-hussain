/* eslint-disable react/prop-types */
import { Navigation } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { configUrlState, userState, watchListState } from "../recoilState";
import { useNavigate } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function SliderContainer({ data }) {
  const user = useRecoilValue(userState);
  const configUrl = useRecoilValue(configUrlState);
  const navigate = useNavigate();
  const [watchlist = [], setWatchlist] = useRecoilState(watchListState);

  async function handleAddToWatchlist(item) {
    if (!user) return navigate("/login");

    const isAlreadyAdded = watchlist.find((list) => list.id === item.id);

    if (isAlreadyAdded) {
      setWatchlist((prevData) =>
        prevData.filter((list) => list.id !== item.id)
      );
      await updateDoc(doc(db, "users", user.uid), {
        watchlist: arrayRemove(item),
      });
      return;
    }

    await updateDoc(doc(db, "users", user.uid), {
      watchlist: arrayUnion(item),
    });

    // const watchlistData = {
    //   id: item.id,
    //   poster_path: item.poster_path,
    //   rating: Number(item.vote_average).toFixed(1),
    //   title: item.title || item.name,
    // };

    setWatchlist((prevData) => {
      return [...prevData, item];
    });
  }

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={6}
      slidesPerGroup={4}
      spaceBetween={25}
      navigation
      onSlideChange={() => console.log("slide changed")}
    >
      {data
        ? data.map((item, i) => {
            return (
              <SwiperSlide key={i} className="bg-carousel rounded-md relative">
                <div className="w-full mb-4 cursor-pointer">
                  <a href="#">
                    <img
                      src={configUrl.poster + item.poster_path}
                      alt="Movie or TV poster"
                      className="w-full"
                    />
                  </a>
                </div>
                {/* <!-- POSTER RATING --> */}
                <div className="w-full mb-4 px-2 flex items-center gap-1">
                  <img className="w-3" src="star-fill.svg" alt="star icon" />
                  <span className="text-grey">
                    {Number(item.vote_average).toFixed(1)}
                  </span>
                  <button className="px-4 py-2 hover:bg-darkGrey rounded-md ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-blue-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </button>
                </div>
                {/* <!-- POSTER TITLE --> */}
                <a
                  href="#"
                  className="text-white hover:underline mb-3 px-2 w-full ellipsis h-12"
                >
                  {`${i + 1}. ${item.title || item.name}`}
                </a>
                {/* <!-- operations button --> */}
                <div className="px-2">
                  <button
                    onClick={() => handleAddToWatchlist(item)}
                    className="w-full flex items-center py-2 bg-darkGrey rounded-md hover:bg-[#191e25] text-blue-500 justify-center mb-2 transition-colors "
                  >
                    {watchlist.find((list) => list.id === item.id) ? (
                      <img
                        src="check2.svg"
                        alt="check icon"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img src="plus.svg" alt="plus icon" className="w-6 h-6" />
                    )}
                    <span className="font-bold">Watchlist</span>
                  </button>
                  <button className="flex items-center gap-2 py-2 px-4 mx-auto w-max hover:bg-darkGrey rounded-md mb-2">
                    <img
                      src="play-fill.svg"
                      alt="plus icon"
                      className="w-6 h-6"
                    />
                    <span className="text-white text-sm font-bold">
                      Trailer
                    </span>
                  </button>
                </div>
                {/* <!-- Add to watchlist hover button --> */}
                <div
                  onClick={() => handleAddToWatchlist(item)}
                  className="absolute z-10 top-[-4.5px] left-[-6px] cursor-pointer addToWatchlistBtn"
                >
                  {watchlist.find((list) => list.id === item.id) ? (
                    <img
                      className="w-12 h-12"
                      src="bookmark-check-fill.svg"
                      alt="bookmark check icon"
                    />
                  ) : (
                    <img
                      className="w-12 h-12"
                      src="bookmark-plus-fill.svg"
                      alt="bookmark plus icon"
                    />
                  )}
                </div>
              </SwiperSlide>
            );
          })
        : Array.from({ length: 6 }, (v, i) => {
            return (
              <SwiperSlide key={i} className="skeleton-item">
                <div className="poster-block skeleton"></div>
                <div className="rating-block skeleton"></div>
                <div className="title-block skeleton"></div>
                <div className="watchlist-block skeleton"></div>
                <div className="trailer-block skeleton"></div>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}

export default SliderContainer;
