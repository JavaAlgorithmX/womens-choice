import ScrollCarousel from "scroll-carousel-react";

export default function Carousel() {
  return (
    <ScrollCarousel
      autoplay
      autoplaySpeed={8}
      speed={7}
      onReady={() => console.log("I am ready")}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
        <div
          key={item}
          className="bg-red-300/20 border-2 border-blue-300/70 rounded h-32 w-48"
        >
          {item}
        </div>
      ))}
    </ScrollCarousel>
  );
}
