import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Filter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    id: 1,
    category: "beard",
    title: "Classic Beard Trim",
    img: "/images/selfbeardtrim.jpeg",
    desc: "Clean lines with a soft fade on the sides for a professional look.",
  },
  {
    id: 2,
    category: "mustache",
    title: "Handlebar Mustache",
    img: "/images/HandlebarMustache.jpg",
    desc: "Curled tips styled with wax for a bold, timeless look.",
  },
  {
    id: 3,
    category: "hair",
    title: "Self Haircut Fade",
    img: "/images/SelfHaircutFade.jpg",
    desc: "DIY mid fade with smooth blending and clean finish.",
  },
  {
    id: 4,
    category: "beard",
    title: "Beard Sculpting",
    img: "/images/BeardSculpting.jpg",
    desc: "Precision shaping for jawline definition and clean neckline.",
  },
  {
    id: 5,
    category: "mustache",
    title: "Minimal Mustache",
    img: "/images/MinimalMustache.avif",
    desc: "Short, neat, and balanced — perfect for subtle style.",
  },
  {
    id: 6,
    category: "hair",
    title: "Textured Crop",
    img: "/images/TexturedCrop.jpg",
    desc: "Modern crop with textured top — easy to maintain daily.",
  },
];

export default function GroomingGallery() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  // 🌟 Animate section entrance
  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, []);

  // 🧠 Filter logic
  const filteredItems =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  // ✨ Animate cards on filter change
  useEffect(() => {
    gsap.fromTo(
      ".groom-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      }
    );
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F8FBFF] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 text-center"
    >
      {/* ✂️ Header */}
      <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="flex justify-center mb-4">
          <Scissors className="w-8 sm:w-10 h-8 sm:h-10 text-sky-500 animate-pulse" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-3">
          Explore{" "}
          <span className="text-sky-500">Your Style</span> — Beard, Mustache &
          Hair
        </h2>
        <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
          Pick a category to learn grooming styles or explore all for full
          inspiration.
        </p>
      </div>

      {/* 🔍 Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
        {["all", "beard", "mustache", "hair"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-medium transition-all border
              ${
                filter === cat
                  ? "bg-sky-500 text-white border-sky-500 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-sky-600"
              }`}
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🧾 Responsive Gallery Grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-4 
          gap-6 sm:gap-8 max-w-7xl mx-auto px-2
        "
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="groom-card group bg-white rounded-2xl shadow-lg overflow-hidden 
              hover:shadow-2xl transition-all duration-500 border border-slate-100"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-4 sm:p-5 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🪄 Empty State */}
      {filteredItems.length === 0 && (
        <p className="text-slate-500 mt-10 text-lg">No styles found.</p>
      )}
    </section>
  );
}
