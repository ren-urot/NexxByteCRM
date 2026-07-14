import Frame2470 from "../../imports/Frame2470";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden h-[min(600px,calc(100svh_-_85px))] md:h-[min(810px,calc(100svh_-_85px))] mx-[0px] mt-[85px]" style={{ backgroundImage: "linear-gradient(65.517deg, rgb(99, 46, 229) 10.199%, rgb(64, 26, 132) 81.319%, rgb(64, 26, 132) 119.61%)" }}>
      <motion.div
        style={{ y: bgY }}
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,98,0,0.1) 50%, transparent 100%)",
            "linear-gradient(225deg, rgba(255,98,0,0.2) 0%, rgba(99,46,229,0.15) 50%, transparent 100%)",
            "linear-gradient(315deg, rgba(255,255,255,0.15) 0%, rgba(64,26,132,0.2) 50%, transparent 100%)",
            "linear-gradient(45deg, rgba(99,46,229,0.25) 0%, rgba(255,98,0,0.15) 50%, transparent 100%)",
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,98,0,0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[108px] h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 py-12 md:py-0">
        {/* Left content */}
        <motion.div
          style={{ y: contentY, opacity }}
          className="flex-1 z-10 flex flex-col justify-center md:ml-[-80px] mr-[0px] my-[0px]"
        >
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#ff6200] font-['Inter',sans-serif] text-[18px] md:text-[22px] italic mb-4"
          >
            Next Generation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white font-['Inter',sans-serif] text-[40px] md:text-[52px] lg:text-[62px] leading-[1.08] tracking-[-0.5px] mb-5 uppercase" style={{ fontWeight: 700 }}
          >
            CRM Software Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/70 font-['Inter',sans-serif] text-[15px] md:text-[17px] leading-[1.6] mb-9 max-w-[480px]"
          >
            Streamline your business relationships with our powerful, intuitive CRM platform designed to boost productivity and drive growth.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToPricing}
            className="flex items-center gap-3 border-2 border-white rounded-lg px-10 py-4 text-white font-['Inter',sans-serif] text-[17px] tracking-[-0.4px] hover:bg-white/10 transition-colors cursor-pointer w-fit"
          >
            Start Now
          </motion.button>
        </motion.div>
        {/* Right illustration */}
        <motion.div
          style={{ y: illustrationY, opacity }}
          className="hidden md:flex flex-1 justify-center md:justify-center z-10 md:ml-8 md:-mr-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-[494px] relative mt-[13px]" style={{ '--frame-scale': `${494 / 775}` } as React.CSSProperties}
          >
            <Frame2470 />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}