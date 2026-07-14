import svgPaths from "../../imports/svg-kp0c976c8e";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router";

const solutions = [
  {
    icon: "finance",
    title: "Finance",
    description: "CRM for financial institutions to manage clients, track portfolios, and ensure compliance with ease.",
    crmType: "finance",
  },
  {
    icon: "realestate",
    title: "Real Estate",
    description: "CRM for agents to manage leads, track properties, and close deals faster.",
    crmType: "realestate",
  },
  {
    icon: "retail",
    title: "Retail Store",
    description: "CRM for retail stores to manage customers, track sales, and boost loyalty.",
    crmType: "retail",
  },
  {
    icon: "hospital",
    title: "Hospital/Clinic",
    description: "CRM for hospitals and clinics to streamline patients, appointments, and follow-ups.",
    crmType: "hospitality",
  },
  {
    icon: "flower",
    title: "Flower Shop",
    description: "CRM for flower shops to manage orders, customers, and deliveries with ease.",
    crmType: "flowershop",
  },
];

function FinanceIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 67.0133 67.1842" fill="none">
      <path d={svgPaths.p2ee9f600} fill="#FF6200" />
      <path d={svgPaths.p41b0000} fill="#FF6200" />
      <path d={svgPaths.p14641a00} fill="#FF6200" />
      <path d={svgPaths.p23806500} fill="#FF6200" />
    </svg>
  );
}

function RealEstateIcon() {
  return (
    <svg width="69" height="73" viewBox="0 0 69.0248 72.6539" fill="none">
      <path d={svgPaths.p30013a00} fill="#FF6200" />
      <path d={svgPaths.p211e21b0} fill="#FF6200" />
    </svg>
  );
}

function RetailIcon() {
  return (
    <svg width="66" height="63" viewBox="0 0 66.1072 63.273" fill="none">
      <path d={svgPaths.p1b30c00} fill="#FF6200" />
      <path d={svgPaths.p3f049d00} fill="#FF6200" />
      <path d={svgPaths.p16cec880} fill="#FF6200" />
      <path d={svgPaths.p3ac14380} fill="#FF6200" />
      <path d={svgPaths.p6eb9600} fill="#FF6200" />
      <path d={svgPaths.p3b2b00} fill="#FF6200" />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg width="68" height="74" viewBox="0 0 67.8574 73.9309" fill="none">
      <g clipPath="url(#clip_hospital)">
        <path d={svgPaths.p35dc9fc0} fill="#FF6200" />
        <path d={svgPaths.pf4aec80} fill="#FF6200" />
        <path d={svgPaths.p22577dc0} fill="#FF6200" />
      </g>
      <defs>
        <clipPath id="clip_hospital">
          <rect fill="white" height="73.9309" width="67.8574" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg width="60" height="66" viewBox="0 0 60.1849 65.5714" fill="none">
      <path d={svgPaths.p15467c00} fill="#FF6200" />
      <path d={svgPaths.p2bd72a80} fill="#FF6200" />
      <path d={svgPaths.p37557d80} fill="#FF6200" />
      <path d={svgPaths.p2618df00} fill="#FF6200" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  finance: <FinanceIcon />,
  realestate: <RealEstateIcon />,
  retail: <RetailIcon />,
  hospital: <HospitalIcon />,
  flower: <FlowerIcon />,
};

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section ref={sectionRef} id="solutions" className="bg-white py-18 md:py-24">
      <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px]">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#ff6200] font-['Inter',sans-serif] text-[18px] md:text-[22px] tracking-[-0.5px] mb-5"
          >
            What We Offer to You
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#2b2b2b] font-['Inter',sans-serif] text-[32px] md:text-[45px] lg:text-[58px] leading-[1.05] tracking-[-0.65px] mb-5"
          >
            Tailored Solutions<br />For Your Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#2b2b2b] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.44px] max-w-[806px] mx-auto"
          >
            Our CRM software helps businesses streamline workflows, strengthen customer relationships, and boost sales with ease.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {solutions.map((sol, index) => (
            <motion.div
              key={sol.title}
              onClick={() => navigate(`/crm/login?type=${sol.crmType}`)}
              className="no-underline cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <div
                className="bg-[#f3f3f3] rounded-[27px] p-7 flex flex-col items-start min-h-[224px] md:min-h-[324px] hover:outline hover:outline-2 hover:outline-[#ff6200] transition-all cursor-pointer"
              >
                <div className="mb-7 h-[63px] flex items-center">
                  {iconMap[sol.icon]}
                </div>
                <h3 className="text-[#ff6200] font-['Inter',sans-serif] text-[20px] md:text-[22px] tracking-[-0.5px] mb-2.5">
                  {sol.title}
                </h3>
                <p className="text-[#2b2b2b] font-['Inter',sans-serif] text-[14px] md:text-[15px] leading-[22px]" style={{ fontWeight: 300 }}>
                  {sol.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Click Above to Log In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col items-center mt-12 gap-3"
        >
          {/* Bouncing arrow */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#ff6200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate("/crm/login")}
            className="group relative overflow-hidden bg-[#ff6200] text-white font-['Inter',sans-serif] text-[15px] md:text-[17px] tracking-[-0.3px] px-8 py-3 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(255,98,0,0.3)] hover:shadow-[0_6px_28px_rgba(255,98,0,0.45)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Click a Card Above to Log In
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>

          <p className="text-[#888] font-['Inter',sans-serif] text-[13px] md:text-[14px] tracking-[-0.2px] mt-1">
            Select a solution above or sign up for a free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}