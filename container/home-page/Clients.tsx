import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getTestimonials, ProcessedTestimonial } from "@/lib/getTestimonials";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-3 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

const ReviewCard = ({
  img,
  name,
  company,
  designation,
  email,
  description,
  type,
}: ProcessedTestimonial) => {
  return (
    <figure
      className={cn(
        "relative w-full max-w-md space-y-5 overflow-hidden rounded-xl border p-5 shadow-lg mb-6",
        "border-white/10 bg-white/5 hover:bg-white/10",
        type === "consulting" ? "border-orange-500/30 bg-orange-500/10" : "border-blue-500/30 bg-blue-500/10"
      )}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row items-center gap-3">
          <img
            className="rounded-full object-cover"
            width="56"
            height="56"
            alt={name}
            src={img}
          />
          <div className="flex flex-col min-w-0 flex-1">
            <figcaption className="text-sm font-semibold text-white md:text-base">
              {name}
            </figcaption>
            <p className="text-sm font-medium text-white/80">
              {designation}
            </p>
            <p className="text-sm font-medium text-white/60">
              {company}
            </p>
          </div>
        </div>
        <div className={cn(
          "self-start px-3 py-1.5 rounded-full text-xs font-medium",
          type === "consulting" 
            ? "bg-orange-500/20 text-orange-300" 
            : "bg-blue-500/20 text-blue-300"
        )}>
          {type === "consulting" ? "Consulting" : "B2B Placement"}
        </div>
      </div>
      <blockquote className="text-sm text-white/90 leading-relaxed md:text-base">
        "{description}"
      </blockquote>
    </figure>
  );
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<ProcessedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perpeXTestimonials, setPerpeXTestimonials] = useState<ProcessedTestimonial[]>([]);
  const [placeXTestimonials, setPlaceXTestimonials] = useState<ProcessedTestimonial[]>([]);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
        setPerpeXTestimonials(data.filter(item => item.type === 'consulting'));
        setPlaceXTestimonials(data.filter(item => item.type === 'placement'));
      } catch (error) {
        setTestimonials([]);
        setPerpeXTestimonials([]);
        setPlaceXTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  // Create different rows for each column with proper distribution
  const consultingFirstRow = perpeXTestimonials.slice(0, 2);
  const consultingSecondRow = perpeXTestimonials.slice(2, 4);
  const consultingThirdRow = perpeXTestimonials.slice(4, 6);

  const placementFirstRow = placeXTestimonials.slice(0, 4);
  const placementSecondRow = placeXTestimonials.slice(4, 8);
  const placementThirdRow = placeXTestimonials.slice(8, 12);

  if (isLoading) {
    return <div className="text-center text-white py-12">Loading testimonials...</div>;
  }

  return (
    <div className="py-12 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900">
      <div className="mx-auto mb-12 md:mb-20 max-w-5xl text-center px-4">
        <h1 className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-light text-white">
          Trusted by{" "}
          <span className="text-blue-400">
            Professionals
          </span>{" "}
          and{" "}
          <span className="text-orange-400">
            Organizations
          </span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300">
          From career placements to business consulting, discover how PlaceX and PerpeX
          have transformed careers and accelerated business growth across industries.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-8 px-4">
        {/* Consulting Section */}
        <div className="flex-1">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-orange-400 mb-2">
              Consulting Excellence
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              PerpeX transforming businesses
            </p>
          </div>
          <div className="relative flex h-[500px] md:h-[700px] w-full flex-row items-center justify-center overflow-hidden rounded-lg">
            {/* Column 1 - Moving Down */}
            <Marquee pauseOnHover vertical className="[--duration:25s]">
              {consultingFirstRow.map((review, index) => (
                <ReviewCard key={`consulting-first-${index}`} {...review} />
              ))}
            </Marquee>
            {/* Column 2 - Moving Up */}
            <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
              {consultingSecondRow.map((review, index) => (
                <ReviewCard key={`consulting-second-${index}`} {...review} />
              ))}
            </Marquee>
            {/* Column 3 - Moving Down - Hidden on mobile */}
            <div className="hidden md:block">
              <Marquee pauseOnHover vertical className="[--duration:35s]">
                {consultingThirdRow.map((review, index) => (
                  <ReviewCard key={`consulting-third-${index}`} {...review} />
                ))}
              </Marquee>
            </div>
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-gray-900"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900"></div>
          </div>
        </div>
        {/* Vertical Divider - Hidden on mobile */}
        <div className="relative hidden lg:flex flex-col items-center">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30"></div>
          <div className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full opacity-50"></div>
        </div>
        {/* Placement Section */}
        <div className="flex-1">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-blue-400 mb-2">
              B2B Placement Success
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              PlaceX connecting talent with opportunities
            </p>
          </div>
          <div className="relative flex h-[500px] md:h-[700px] w-full flex-row items-center justify-center overflow-hidden rounded-lg">
            {/* Column 1 - Moving Up */}
            <Marquee reverse pauseOnHover vertical className="[--duration:40s]">
              {placementFirstRow.map((review, index) => (
                <ReviewCard key={`placement-first-${index}`} {...review} />
              ))}
            </Marquee>
            {/* Column 2 - Moving Down */}
            <Marquee pauseOnHover vertical className="[--duration:45s]">
              {placementSecondRow.map((review, index) => (
                <ReviewCard key={`placement-second-${index}`} {...review} />
              ))}
            </Marquee>
            {/* Column 3 - Moving Up - Hidden on mobile */}
            <div className="hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:50s]">
                {placementThirdRow.map((review, index) => (
                  <ReviewCard key={`placement-third-${index}`} {...review} />
                ))}
              </Marquee>
            </div>
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-gray-900"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;