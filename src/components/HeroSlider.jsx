import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef();
  const videoRefs = useRef([]);
  const [current, setCurrent] = useState(0);

  // 🎞️ Video list
  const videos = [
    "/videos/slide1.mp4",
    "/videos/cuttingv2.mp4",
    "/videos/cuttingv3.mp4",
  ];

  // ✨ GSAP scroll animation (fade-in)
  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // ➡️ Next / ⬅️ Prev controls
  const nextSlide = () => {
    const nextIndex = (current + 1) % videos.length;
    animateSlideChange(current, nextIndex);
    setCurrent(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + videos.length) % videos.length;
    animateSlideChange(current, prevIndex);
    setCurrent(prevIndex);
  };

  // 🎞️ Smooth fade + slide animation
  const animateSlideChange = (from, to) => {
    const fromEl = videoRefs.current[from];
    const toEl = videoRefs.current[to];

    if (fromEl && toEl) {
      gsap.to(fromEl, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power2.inOut",
      });
      gsap.fromTo(
        toEl,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.inOut" }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full 
        flex flex-col justify-center items-center text-center
        py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 
        bg-[#DFF2FE]
      "
    >
      <div className="max-w-5xl mx-auto">
        {/* 🧾 Title & Text */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Hair Shortcut by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
            Deigo
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Master quick and stylish hair shortcuts with{" "}
          <span className="font-semibold text-sky-500">
            Deigo’s signature techniques.
          </span>{" "}
          Elevate your style and confidence with every cut.
        </p>

        <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
          Explore Styles
        </button>

        {/* 🎥 Video Slider */}
        <div className="relative mt-12 w-full flex justify-center items-center">
          {/* ⬅️ Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous video"
            className="
              absolute -left-6 sm:-left-10 md:-left-14
              top-1/2 -translate-y-1/2
              bg-white/70 hover:bg-sky-100 text-sky-700
              shadow-lg hover:shadow-xl
              p-2 sm:p-3 md:p-4 rounded-full
              backdrop-blur-md z-20
              transition-all duration-300
            "
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          {/* Slider Container */}
          <div
            className="
              relative w-full 
              max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 
              aspect-video 
              rounded-2xl overflow-hidden 
              shadow-2xl border border-sky-200
              transition-transform duration-500 hover:scale-[1.02]
            "
          >
            {videos.map((video, index) => (
              <video
                key={index}
                ref={(el) => (videoRefs.current[index] = el)}
                src={video}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
            ))}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-[5]" />

            {/* ⚪ Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
              {videos.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    animateSlideChange(current, index);
                    setCurrent(index);
                  }}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === current
                      ? "bg-sky-400 scale-110"
                      : "bg-white/70 hover:bg-sky-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ➡️ Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next video"
            className="
              absolute -right-6 sm:-right-10 md:-right-14
              top-1/2 -translate-y-1/2
              bg-white/70 hover:bg-sky-100 text-sky-700
              shadow-lg hover:shadow-xl
              p-2 sm:p-3 md:p-4 rounded-full
              backdrop-blur-md z-20
              transition-all duration-300
            "
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </section>
  );
}
