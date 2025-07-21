"use client";
import { Ready } from "@/components";
import { About, Clients, Hero, Projects, X } from "@/container";
import { useEffect, useRef } from "react";
import Marquee from "@/components/Marquee";

export default function Home() {
	const containerRef = useRef(null);
	const locomotiveScrollRef = useRef<any>(null);
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			if (containerRef.current) {
				locomotiveScrollRef.current = new LocomotiveScroll({
					el: containerRef.current,
				} as any);
			}
		})();

		return () => {
			if (locomotiveScrollRef.current) {
				locomotiveScrollRef.current.destroy();
				locomotiveScrollRef.current = null;
			}
		}
	}, []);

	return (
		<div ref={containerRef} data-scroll-container>
			
				<Hero />
				<Marquee
           
              className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[20px] xm:pb-[15px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
            />
				<Projects />
				<About />
				<X />
				<Clients />
				<Ready />
		
		</div>
	);
}