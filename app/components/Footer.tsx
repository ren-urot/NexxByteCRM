import { Link } from "react-router";
import svgPaths from "../../imports/svg-kp0c976c8e";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

function FooterLogo() {
  return (
    <div className="h-[30px] w-[138px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 152.729 33.2914">
        <path d={svgPaths.p204472e0} fill="white" />
        <path d={svgPaths.p5502a40} fill="white" />
        <path d={svgPaths.p36a28d00} fill="white" />
        <path d={svgPaths.p60fe270} fill="white" />
        <path d={svgPaths.p1e0f9d00} fill="white" />
        <path d={svgPaths.p2bb85800} fill="white" />
        <path d={svgPaths.p1e199b00} fill="white" />
        <path d={svgPaths.p464ce00} fill="white" />
        <path d={svgPaths.p2ae8d680} fill="white" />
        <path d={svgPaths.p3e28b000} fill="white" />
      </svg>
    </div>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer ref={footerRef} id="footer" className="bg-[#5828c5]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-[80%] mx-auto px-5 md:px-10 lg:px-[108px] py-10 md:py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-9 lg:gap-14">
          {/* Logo */}
          <div className="flex flex-col gap-10">
            <FooterLogo />
          </div>

          {/* Services */}
          <div className="text-white font-['Inter',sans-serif]">
            <h4 className="text-[16px] mb-5" style={{ fontWeight: 600 }}>Services</h4>
            <div className="text-[13px] leading-[22px] space-y-0.5">
              <p>Finance, CRM</p>
              <p>Real Estate, CRM</p>
              <p>Retail Store, CRM</p>
              <p>Hospital/Clinic, CRM</p>
              <p>Flower Shop, CRM</p>
            </div>
          </div>

          {/* About Us & Contact Us */}
          <div className="text-white font-['Inter',sans-serif]">
            <h4 className="text-[16px] mb-5" style={{ fontWeight: 600 }}>Company</h4>
            <div className="text-[13px] leading-[22px] space-y-2">
              <Link to="/about" className="block text-white hover:text-[#ff6200] transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-white hover:text-[#ff6200] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Terms */}
          <div className="text-white font-['Inter',sans-serif]">
            <h4 className="text-[16px] mb-5" style={{ fontWeight: 600 }}>Terms &amp; Policy</h4>
            <div className="text-[13px] leading-[22px] space-y-0.5">
              <p>Terms of Use</p>
              <p>Privacy</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-white font-['Inter',sans-serif] text-[16px] mb-5" style={{ fontWeight: 600 }}>
              Follow Us
            </p>
            <div className="flex gap-3">
              {/* FB */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                  <path d="M6.5 10.25H8.75L9.75 6.25H6.5V4.25C6.5 3.23 6.5 2.25 8.5 2.25H9.75V-1.15C9.393 -1.199 8.137 -1.25 6.813 -1.25C4.043 -1.25 2.5 0.692 2.5 3.85V6.25H0V10.25H2.5V19.25H6.5V10.25Z" fill="#5828C5" />
                </svg>
              </div>
              {/* IG */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4.75 1H11.25C13.325 1 15 2.675 15 4.75V11.25C15 13.325 13.325 15 11.25 15H4.75C2.675 15 1 13.325 1 11.25V4.75C1 2.675 2.675 1 4.75 1Z" stroke="#5828C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="#5828C5" strokeWidth="1.5" />
                  <circle cx="11.5" cy="4.5" r="0.75" fill="#5828C5" />
                </svg>
              </div>
              {/* YT */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M15.36 1.88C15.18 1.2 14.64 0.66 13.96 0.48C12.74 0.16 8 0.16 8 0.16C8 0.16 3.26 0.16 2.04 0.48C1.36 0.66 0.82 1.2 0.64 1.88C0.32 3.1 0.32 5.62 0.32 5.62C0.32 5.62 0.32 8.14 0.64 9.36C0.82 10.04 1.36 10.58 2.04 10.76C3.26 11.08 8 11.08 8 11.08C8 11.08 12.74 11.08 13.96 10.76C14.64 10.58 15.18 10.04 15.36 9.36C15.68 8.14 15.68 5.62 15.68 5.62C15.68 5.62 15.68 3.1 15.36 1.88Z" fill="#5828C5" />
                  <path d="M6.4 8L10.56 5.62L6.4 3.24V8Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <div className="bg-white py-3.5">
        <p className="text-center text-[#6b6b6b] font-['Inter',sans-serif] text-[13px]">
          &copy; 2025 NexxByte. All rights reserved
        </p>
      </div>
    </footer>
  );
}