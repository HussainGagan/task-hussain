import { SwiperSlide } from "swiper/react";

function SliderSkeletonItem() {
  return (
    <SwiperSlide className="skeleton-item">
      <div className="poster-block skeleton"></div>
      <div className="rating-block skeleton"></div>
      <div className="title-block skeleton"></div>
      <div className="watchlist-block skeleton"></div>
      <div className="trailer-block skeleton"></div>
    </SwiperSlide>
  );
}

export default SliderSkeletonItem;
