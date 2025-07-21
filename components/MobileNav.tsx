"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Menu } from "lucide-react";

import { navbarItems } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNav() {
	const [toggle, setToggle] = useState(false);
	return (
		<>
			<Menu
				onClick={() => setToggle(true)}
				className="text-3xl cursor-pointer text-white"
			/>
			<AnimatePresence mode="wait">
				{toggle && (
					<motion.div
						initial={{ y: "-100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{ duration: 1, ease: [0.3, 0.86, 0.36, 0.95] }}
						className="fixed top-0 bottom-0 right-0 z-50 w-full min-h-screen flex justify-end items-end flex-col bg-black">
						<div className="w-full flex justify-end items-center h-[8vh] border-b border-[#f1f1f155] padding-x">
							<IoMdClose
								onClick={() => setToggle(false)}
								className="text-3xl cursor-pointer text-white"
							/>
						</div>
						<ul className="h-full w-full flex justify-center text-left flex-col gap-[10px] padding-x">
							{navbarItems.map((item) => (
								<Link
									href={item.href}
									key={item.id}
									onClick={() => setToggle(false)}
									className="text-[80px] leading-[67px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] text-white">
									{item.title}
								</Link>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
