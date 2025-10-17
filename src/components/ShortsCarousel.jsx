import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ShortsCarousel() {
  const sectionRef = useRef();
  const scrollContainerRef = useRef();

  // ✨ Fade-in on scroll
  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // 🎥 YouTube Shorts URLs
  const videos = [
    "https://www.youtube.com/embed/3doBdRJfJvs",
    "https://www.youtube.com/embed/5FqC07Ix_bI",
    "https://www.youtube.com/embed/eWLblAbP9gg",
    "https://www.youtube.com/embed/5Fbwd_Pdykk",
    "https://www.youtube.com/embed/7XTFtCko-Ao",
    "https://www.youtube.com/embed/5qap5aO4i9A",
  ];

  // 🧭 Scroll buttons
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EAF6FF] py-20 px-6 sm:px-10 text-center overflow-hidden"
    >
      {/* ✨ Heading & Text */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Watch{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
            Deigo’s YouTube Shorts
          </span>
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
          Get inspired by fast, trendy, and easy-to-follow hair transformations.
          Watch{" "}
          <span className="font-semibold text-sky-500">
            real grooming tutorials
          </span>{" "}
          from Deigo’s channel.
        </p>
      </div>

      {/* 🎥 Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* ⬅️ Prev Button */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll Left"
          className="absolute -left-4 sm:-left-10 top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-sky-100 text-sky-700 p-3 rounded-full shadow-md hover:shadow-lg
          backdrop-blur-md transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* 🎞️ Scrollable Shorts */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory px-8 scroll-smooth no-scrollbar"
        >
          {videos.map((src, i) => (
            <div
              key={i}
              className="relative min-w-[200px] sm:min-w-[240px] md:min-w-[280px] aspect-[9/16]
              bg-black rounded-2xl overflow-hidden flex-shrink-0 snap-center shadow-xl
              hover:scale-[1.02] transition-transform duration-300"
            >
              <iframe
                src={src}
                title={`Deigo grooming short ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* ➡️ Next Button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll Right"
          className="absolute -right-4 sm:-right-10 top-1/2 -translate-y-1/2
          bg-white/80 hover:bg-sky-100 text-sky-700 p-3 rounded-full shadow-md hover:shadow-lg
          backdrop-blur-md transition-all duration-300 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

/* 🧩 Tailwind CSS Utility to Hide Scrollbar */
const styles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
