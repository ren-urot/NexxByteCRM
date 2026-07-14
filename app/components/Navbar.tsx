import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import svgPaths from "../../imports/svg-2x9crwyny4";
import { Menu, X } from "lucide-react";

function Logo() {
  return (
    <div className="h-[24px] w-[111px] shrink-0">
      <svg className="block size-full mx-[0px] mt-[5px] mb-[0px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 111.217 24.2384">
        <g>
          <path d={svgPaths.p35e1f00} fill="#FF4E00" />
          <path d={svgPaths.p3f84db00} fill="#383838" />
          <path d={svgPaths.p387e2d00} fill="#383838" />
          <path d={svgPaths.pd3ea180} fill="#383838" />
          <path d={svgPaths.p3e529840} fill="#383838" />
          <path d={svgPaths.p1a2e7680} fill="#FF4E00" />
          <path d={svgPaths.p326996f2} fill="#FF4E00" />
          <path d={svgPaths.p3a897f80} fill="#383838" />
          <path d={svgPaths.pc62baf0} fill="#383838" />
          <path d={svgPaths.p11c05700} fill="#383838" />
        </g>
      </svg>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#d8d8d8] h-[85px] flex items-center px-5 md:px-10 lg:px-[108px]">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8 font-['Inter',sans-serif]">
        <Link to="/about" className="text-[#383838] text-[16px] cursor-pointer hover:text-[#ff4e00] transition-colors whitespace-nowrap">About Us</Link>
        <Link to="/contact" className="text-[#383838] text-[16px] cursor-pointer hover:text-[#ff4e00] transition-colors whitespace-nowrap ml-[0px] mr-[53px] my-[0px]">Contact Us</Link>
        <button
          onClick={() => navigate("/signup")}
          className="bg-transparent border-[1.5px] border-[#ff4e00] rounded-[6.3px] px-7 py-2.5 text-[#ff4e00] font-['Inter',sans-serif] text-[17px] cursor-pointer hover:bg-[#ff4e00] hover:text-white transition-colors whitespace-nowrap"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#383838] z-50">
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-[85px] left-0 right-0 bg-white border-b border-[#d8d8d8] px-6 py-6 flex flex-col gap-4 md:hidden font-['Inter',sans-serif]">
          <Link to="/about" onClick={() => setMobileOpen(false)} className="text-[#383838] text-[17px] text-left py-2 hover:text-[#ff4e00] transition-colors">About Us</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-[#383838] text-[17px] text-left py-2 hover:text-[#ff4e00] transition-colors">Contact Us</Link>
          <Link
            to="/signup"
            onClick={() => setMobileOpen(false)}
            className="border-[1.5px] border-[#ff4e00] rounded-[6.3px] px-8 py-2.5 text-[#ff4e00] text-center mt-2 hover:bg-[#ff4e00] hover:text-white transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}