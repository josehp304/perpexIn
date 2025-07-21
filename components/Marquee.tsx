import { TMarqueeProps } from "@/types";
import { TextMarquee } from "@/animation";

export default function Marquee({ className }: Omit<TMarqueeProps, 'title'>) {
	return (
		<TextMarquee baseVelocity="0.7">
			<h1
				className={`font-FoundersGrotesk bg-black font-normal border-y border-[#ffffff55] uppercase text-white whitespace-nowrap tracking-[-5px] ${className}`}>
				STEP INTO ₹ISK &nbsp;
			</h1>
			<h1
				className={`font-FoundersGrotesk bg-black font-normal border-y border-[#ffffff55] uppercase text-blue-600 whitespace-nowrap tracking-[-5px] ${className}`}>
				STEP INTO ₹IZK &nbsp;
			</h1>
		</TextMarquee>
	);
}