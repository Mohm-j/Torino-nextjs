import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./Slideshow.module.css";
import { toFarsiNumber } from "@/utils/helper";

const images = [
  "/icons/slide1.png",
  "/icons/slide2.png",
  "/icons/slide3.png",
  "/icons/slide4.png",
];

export default function Slideshow() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className={styles.container}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
        modules={[EffectCards]}
        effect="cards"
        grabCursor={true}
        className={styles.swiper}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              alt={`slide ${idx + 1}`}
              width={400}
              height={300}
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <button onClick={handleNext} className={styles.btn}>
          <Image
            src="/icons/Line arrow-right.svg"
            alt="right arrow icon"
            width={24}
            height={24}
            className={styles.btnArrows}
            style={{
              marginTop: "1.2rem",
            }}
          />
        </button>
        <span
          className={styles.counter}
          style={{
            fontSize: "1.6rem",
            fontWeight: "bold",
            marginTop: "1.2rem",
          }}
        >
          {toFarsiNumber(images.length)} / {toFarsiNumber(current + 1)}
        </span>
        <button onClick={handlePrev} className={styles.btn}>
          <Image
            src="/icons/Line arrow-left.svg"
            alt="left arrow icon"
            width={24}
            height={24}
            className={styles.btnArrows}
            style={{
              marginTop: "1.2rem",
            }}
          />
        </button>
      </div>
    </div>
  );
}
