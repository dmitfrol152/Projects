import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { BannersProps } from "./types";
import styles from "./SwiperContainer.module.scss";
import { SwiperItem } from "./SwiperItem";

export function SwiperContainer({ banners }: BannersProps) {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SwiperItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
