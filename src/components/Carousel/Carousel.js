import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; // Updated import

export default function Carousel({ children, title, className = "" }) {
  const containerRef = useRef(null);

  const scroll = (dir) => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth * 0.8;
    containerRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`py-8 px-4 ${className}`}>
      {title && (
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="relative">
        {/* Arrow buttons */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition z-10"
        >
          <MdChevronLeft className="w-6 h-6 text-gray-700" /> {/* Updated icon */}
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition z-10"
        >
          <MdChevronRight className="w-6 h-6 text-gray-700" /> {/* Updated icon */}
        </button>

        {/* Scrollable carousel container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          tabIndex={0}
          aria-label={title ? `${title} carousel` : "carousel"}
        >
          {React.Children.map(children, (child, idx) => (
            <div
              className="snap-center flex-shrink-0 w-48 md:w-56 lg:w-64"
              key={idx}
              tabIndex={-1}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
