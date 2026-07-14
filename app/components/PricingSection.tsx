import { Check, Zap, Sun, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const plans = [
  {
    name: "Free Trial",
    price: "P0",
    period: "",
    description: "Try all features free for 14 days",
    features: ["Up to 50 customers", "Basic POS", "Multiple CRM types", "Email support"],
    highlighted: false,
    icon: Zap,
  },
  {
    name: "Basic",
    price: "P999",
    period: "/month",
    description: "Perfect for small flower shops",
    features: ["Up to 500 customers", "Full POS & inventory", "Multiple CRM types", "Delivery tracking", "Priority support"],
    highlighted: true,
    icon: Sun,
  },
  {
    name: "Premium",
    price: "P2,499",
    period: "/month",
    description: "For growing businesses",
    features: ["Unlimited customers", "Advanced analytics", "Multiple CRM types", "Workshop management", "Delivery tracking", "24/7 phone support"],
    highlighted: false,
    icon: ShieldCheck,
  },
];

export function PricingSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="pricing" className="bg-white py-18 md:py-24">
      <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px]">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#ff6200] font-['Inter',sans-serif] text-[18px] md:text-[22px] tracking-[-0.5px] mb-5"
          >
            Our Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#2b2b2b] font-['Inter',sans-serif] text-[32px] md:text-[45px] lg:text-[58px] leading-[1.05] tracking-[-0.65px]"
          >
            Simple pricing based<br />on your needs
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`group relative rounded-[20px] flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "border-2 border-[#ff6200] shadow-[0_8px_40px_rgba(255,98,0,0.15)] hover:shadow-[0_16px_50px_rgba(255,98,0,0.25)]"
                    : "border border-[#e8e8e8] shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 bg-[#ff6200] text-white font-['Inter',sans-serif] text-[11px] tracking-[0.5px] uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-[0_2px_8px_rgba(255,98,0,0.3)]" style={{ fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}

                <div className="bg-white rounded-[20px] p-7 md:p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 ${
                    plan.highlighted
                      ? "bg-[#ff6200] text-white"
                      : "bg-[#f5f5f5] text-[#888]"
                  }`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  {/* Plan name */}
                  <p className={`font-['Inter',sans-serif] text-[18px] md:text-[20px] tracking-[-0.3px] mb-3 ${
                    plan.highlighted ? "text-[#ff6200]" : "text-[#2b2b2b]"
                  }`} style={{ fontWeight: 600 }}>
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span className={`font-['Inter',sans-serif] text-[36px] md:text-[42px] tracking-[-1.5px] ${
                      plan.highlighted ? "text-[#ff6200]" : "text-[#2b2b2b]"
                    }`} style={{ fontWeight: 700 }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="font-['Inter',sans-serif] text-[#888] text-[14px] md:text-[15px] tracking-[-0.2px]">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Subtitle for free trial */}
                  {!plan.period && (
                    <p className="font-['Inter',sans-serif] text-[#999] text-[13px] tracking-[-0.2px] mb-3">
                      for 14 days
                    </p>
                  )}

                  {/* Description */}
                  <p className="font-['Inter',sans-serif] text-[#888] text-[13px] md:text-[14px] tracking-[-0.2px] leading-[1.5] mb-6" style={{ fontWeight: 400 }}>
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="h-[1px] bg-[#eee] mb-6" />

                  {/* Features */}
                  <div className="space-y-3.5 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlighted ? "bg-[#fff0e5] text-[#ff6200]" : "bg-[#f3f3f3] text-[#888]"
                        }`}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="font-['Inter',sans-serif] text-[#444] text-[13px] md:text-[14px] tracking-[-0.2px] leading-[1.4]" dangerouslySetInnerHTML={{ __html: feature }}>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate(`/crm/signup?plan=${plan.name === "Free Trial" ? "free" : plan.name.toLowerCase()}`)}
                    className={`mt-7 rounded-[12px] py-3.5 px-5 font-['Inter',sans-serif] text-[14px] tracking-[-0.2px] transition-all duration-200 cursor-pointer w-full ${
                      plan.highlighted
                        ? "bg-[#ff6200] text-white shadow-[0_4px_16px_rgba(255,98,0,0.25)] hover:bg-[#e85800] hover:shadow-[0_6px_20px_rgba(255,98,0,0.35)]"
                        : "bg-[#f5f5f5] text-[#2b2b2b] hover:bg-[#eaeaea]"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    Get started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}