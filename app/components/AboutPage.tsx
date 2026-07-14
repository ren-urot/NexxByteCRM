import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwdGVhbSUyMG9mZmljZSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczNTU0OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const teamImg = "https://images.unsplash.com/photo-1553632168-eb4237620881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjBjb3dvcmtpbmclMjBvcGVuJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzYzMzkxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower businesses of all sizes with intuitive, powerful CRM tools that drive growth and build lasting customer relationships.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We continuously push boundaries, integrating the latest technology to deliver smarter, faster, and more reliable solutions.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    desc: "Every feature we build starts with our users. We listen, adapt, and deliver solutions that truly make a difference.",
  },
  {
    icon: Heart,
    title: "Built with Passion",
    desc: "Our team is driven by a genuine passion for helping businesses succeed and creating software people love to use.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen font-['Inter',sans-serif]">
      <Navbar />

      {/* Hero */}
      <section className="pt-[85px]">
        <div className="bg-[#5828c5] py-16 md:py-24">
          <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px] text-center">
            <p className="text-[#ff6200] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.3px] mb-3">
              Who We Are
            </p>
            <h1 className="text-white font-['Inter',sans-serif] text-[27px] md:text-[43px] lg:text-[51px] leading-[1.05] tracking-[-0.8px] mb-4" style={{ fontWeight: 600 }}>
              About Us
            </h1>
            <p className="text-white/70 font-['Inter',sans-serif] text-[15px] md:text-[18px] tracking-[-0.3px] max-w-[520px] mx-auto" style={{ fontWeight: 300 }}>
              Learn about our mission, values, and the team behind the CRM platform trusted by businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px] flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <p className="text-[#ff6200] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.3px] mb-5">
              Our Story
            </p>
            <h2 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[26px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.6px] mb-6" style={{ fontWeight: 600 }}>
              Founded by<br />industry veterans
            </h2>
            <div className="text-[#555] font-['Inter',sans-serif] text-[14px] md:text-[17px] leading-[26px] tracking-[-0.3px] space-y-5" style={{ fontWeight: 300 }}>
              <p>
                Our platform was founded with a simple belief: every business deserves access to powerful, easy-to-use CRM tools. Our founding team brings decades of combined experience in enterprise software, customer success, and product design.
              </p>
              <p>
                We go beyond delivering products, we build meaningful partnerships. By combining proven practices with forward-thinking strategies, we create tailored solutions that solve today&#39;s challenges and prepare businesses for tomorrow.
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <ImageWithFallback
              src={teamImg}
              alt="Our team"
              className="w-full max-w-[560px] rounded-[32px] object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f7f7f7] py-16 md:py-24">
        <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px]">
          <div className="text-center mb-12">
            <p className="text-[#ff6200] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.3px] mb-4">
              What Drives Us
            </p>
            <h2 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[26px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.6px]" style={{ fontWeight: 600 }}>
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-[20px] p-7 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-[#fff0e5] text-[#ff6200] flex items-center justify-center mb-5">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[17px] md:text-[18px] tracking-[-0.3px] mb-3" style={{ fontWeight: 600 }}>
                    {v.title}
                  </h3>
                  <p className="text-[#666] font-['Inter',sans-serif] text-[13px] md:text-[14px] leading-[22px] tracking-[-0.2px]" style={{ fontWeight: 400 }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}