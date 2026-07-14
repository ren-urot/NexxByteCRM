import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const aboutImg = "https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwbGFwdG9wJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzYzMzkxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="bg-[#f7f7f7] py-18 md:py-24 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px] flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* Left text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[#ff6200] font-['Inter',sans-serif] text-[18px] md:text-[22px] tracking-[-0.5px] mb-7">
            Who We Are
          </p>
          <h2 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[28px] md:text-[41px] lg:text-[54px] leading-[1.05] tracking-[-0.65px] mx-[0px] mt-[-10px] mb-[25px]">
            Founded by<br />industry veterans
          </h2>
          <div className="text-[#2b2b2b] font-['Inter',sans-serif] text-[14px] md:text-[18px] leading-[28px] tracking-[-0.4px] space-y-5" style={{ fontWeight: 300 }}>
            <p>Founded by industry veterans, our company was built on deep knowledge, experience, and a passion for innovation. We understand the unique challenges businesses face and design solutions that drive efficiency and growth.</p>
            <p>
              We go beyond delivering products and build meaningful partnerships. By combining proven practices with forward-thinking strategies, we create tailored solutions that solve today&#39;s challenges and prepare businesses for tomorrow.
            </p>
          </div>
        </motion.div>
        {/* Right image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={aboutImg}
            alt="Team working"
            className="w-full max-w-[630px] rounded-[40px] object-cover aspect-[4/3.86]"
          />
        </motion.div>
      </div>
    </section>
  );
}