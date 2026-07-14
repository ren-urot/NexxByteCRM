import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Our Office", lines: ["123 Tech Avenue, Suite 200", "San Francisco, CA 94105"] },
  { icon: Phone, title: "Phone", lines: ["+1 (800) 123-4567", "+1 (800) 123-4568"] },
  { icon: Mail, title: "Email", lines: ["info@crmplatform.com", "support@crmplatform.com"] },
  { icon: Clock, title: "Business Hours", lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"] },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen font-['Inter',sans-serif]">
      <Navbar />

      {/* Hero */}
      <section className="pt-[85px]">
        <div className="bg-[#5828c5] py-16 md:py-24">
          <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px] text-center">
            <p className="text-[#ff6200] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.3px] mb-3">
              Get In Touch
            </p>
            <h1 className="text-white font-['Inter',sans-serif] text-[32px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-[-0.8px] mb-4" style={{ fontWeight: 600 }}>
              Contact Us
            </h1>
            <p className="text-white/70 font-['Inter',sans-serif] text-[15px] md:text-[18px] tracking-[-0.3px] max-w-[520px] mx-auto" style={{ fontWeight: 300 }}>
              Have a question or need help? We&#39;d love to hear from you. Reach out and our team will get back to you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1260px] mx-auto px-5 md:px-10 lg:px-[108px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-[#f7f7f7] rounded-[20px] p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#fff0e5] text-[#ff6200] flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[16px] tracking-[-0.3px] mb-2" style={{ fontWeight: 600 }}>
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-[#666] font-['Inter',sans-serif] text-[13px] md:text-[14px] leading-[22px] tracking-[-0.2px]" style={{ fontWeight: 400 }}>
                      {line}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Form Section */}
          <div className="max-w-[680px] mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#ff6200] font-['Inter',sans-serif] text-[16px] md:text-[20px] tracking-[-0.3px] mb-3">
                Send a Message
              </p>
              <h2 className="text-[#2b2b2b] font-['Inter',sans-serif] text-[26px] md:text-[38px] leading-[1.1] tracking-[-0.6px]" style={{ fontWeight: 600 }}>
                We&#39;d love to help
              </h2>
            </div>

            {submitted && (
              <div className="bg-[#e8f5e9] text-[#2e7d32] font-['Inter',sans-serif] text-[14px] rounded-[12px] p-4 mb-6 text-center" style={{ fontWeight: 500 }}>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[#2b2b2b] font-['Inter',sans-serif] text-[13px] tracking-[-0.2px] mb-1.5 block" style={{ fontWeight: 500 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full border border-[#ddd] rounded-[10px] px-4 py-3 text-[14px] text-[#2b2b2b] font-['Inter',sans-serif] outline-none focus:border-[#5828c5] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#2b2b2b] font-['Inter',sans-serif] text-[13px] tracking-[-0.2px] mb-1.5 block" style={{ fontWeight: 500 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-[#ddd] rounded-[10px] px-4 py-3 text-[14px] text-[#2b2b2b] font-['Inter',sans-serif] outline-none focus:border-[#5828c5] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[#2b2b2b] font-['Inter',sans-serif] text-[13px] tracking-[-0.2px] mb-1.5 block" style={{ fontWeight: 500 }}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full border border-[#ddd] rounded-[10px] px-4 py-3 text-[14px] text-[#2b2b2b] font-['Inter',sans-serif] outline-none focus:border-[#5828c5] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#2b2b2b] font-['Inter',sans-serif] text-[13px] tracking-[-0.2px] mb-1.5 block" style={{ fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full border border-[#ddd] rounded-[10px] px-4 py-3 text-[14px] text-[#2b2b2b] font-['Inter',sans-serif] outline-none focus:border-[#5828c5] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ff6200] text-white rounded-[10px] py-3.5 font-['Inter',sans-serif] text-[15px] tracking-[-0.2px] cursor-pointer hover:bg-[#e85800] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}