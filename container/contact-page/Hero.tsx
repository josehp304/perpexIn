import Image from "next/image";

import { motion } from "framer-motion";


export default function Hero() {
  return (
    <>
      {/* Full-screen Spline section */}
     

      {/* Content section that appears after scrolling */}
      <section className="w-full padding-x bg-black">
        <div className="w-full flex flex-col">
          <div className="w-full margin">
            <h1 className="heading tracking-[-1.3px] text-white font-semibold font-NeueMontreal uppercase">
              <div className="flex items-center gap-[5px]">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  viewport={{ once: true }}
                  transition={{
                    ease: [0.86, 0, 0.07, 0.995],
                    duration: 1,
                    delay: 0.5,
                  }}>
                 
                </motion.span>
                <h1 className="pt-10 sm:pt-12 text-[40px] sm:text-[40px] md:text-[40px] lg:text-[100px] xl:text-[100px] text-white font-light font-FoundersGrotesk">
                  Contact Us
                </h1>
              </div>
            
            </h1>
          </div>
          
          <div className="w-full pb-[15px]">
            <h3 className="paragraph font-medium text-white font-NeueMontreal">
              Fill the form below:
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}