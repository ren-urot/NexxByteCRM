import { useState } from "react";
import { CRM_CONFIGS, type CrmType, useCrm } from "./CrmContext";
import { useAuth } from "./AuthContext";
import { useNavigate, useSearchParams } from "react-router";
import { NexxByteLogo } from "./NexxByteLogo";
const imgFlower = "https://images.unsplash.com/photo-1694620133074-44180d9bd5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NzM1NjA4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const VALID_CRM_TYPES = ["finance", "realestate", "retail", "hospitality", "flowershop"];

export function CrmLogin() {
  return <CrmLoginInner />;
}

function CrmLoginInner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const crmType = VALID_CRM_TYPES.includes(typeParam || "") ? (typeParam as CrmType) : null;
  const crmConfig = crmType ? CRM_CONFIGS[crmType] : null;
  const { subscriptions, setActiveSubscription, addSubscription } = useCrm();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authenticate user and set role based on email domain
    login(email);
    // If a CRM type was selected from a solution card, switch to or create that subscription
    if (crmType) {
      const existingSub = subscriptions.find((s) => s.crmType === crmType);
      if (existingSub) {
        setActiveSubscription(existingSub.id);
      } else {
        addSubscription({
          plan: "basic",
          planName: "Basic",
          crmType,
          businessName: CRM_CONFIGS[crmType].name.replace(" CRM", ""),
        });
      }
    }
    navigate("/crm/dashboard");
  };

  return (
    <div className="flex min-h-screen font-['Inter',sans-serif]">
      {/* Left - Image Panel */}
      <div className="hidden md:block md:w-[40%] lg:w-[45%] relative">
        <img src={crmConfig?.image || imgFlower} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: crmConfig ? `${crmConfig.color}66` : "rgba(255,78,0,0.4)" }} />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="text-white/90 text-center text-[16px] leading-[24px]">
            {crmConfig
              ? `Manage your ${crmConfig.customerLabelPlural.toLowerCase()}, track ${crmConfig.saleLabel.toLowerCase()}s, and grow your business with ${crmConfig.name}.`
              : "Manage your business with ease. Track sales, customers, leads, and more, all in one place."}
          </p>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-[70px]">
            <NexxByteLogo size={28} />
            <div className="w-[2px] h-[28px]" style={{ backgroundColor: crmConfig?.color || "#ff4e00" }} />
            <p className="text-[#383838] text-[20px] font-medium whitespace-nowrap">
              {crmConfig ? crmConfig.name : "CRM"}
            </p>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[#383838] text-[28px] font-semibold leading-[42px] mb-1">Log In</h1>
            <p className="text-[#9a9a9a] text-[15px]">
              {crmConfig
                ? `Welcome back to ${crmConfig.name}! Please enter your credentials.`
                : "Welcome back! Please enter your credentials."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@bloomshop.com"
                  className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] pl-[44px] pr-4 text-[15px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#ff4e00] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] pl-[44px] pr-[48px] text-[15px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#ff4e00] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#383838] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#d0d0d0] accent-[#ff4e00]"
                />
                <span className="text-[#5d5d5d] text-[14px] font-medium">Remember me</span>
              </label>
              <button type="button" className="text-[#ff4e00] text-[14px] font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-[52px] bg-[#ff4e00] text-white text-[16px] font-semibold rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] hover:bg-[#e64500] active:scale-[0.99] transition-all cursor-pointer"
            >
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#e0e0e0]" />
            <span className="text-[#b0b0b0] text-[13px]">or</span>
            <div className="flex-1 h-px bg-[#e0e0e0]" />
          </div>

          {/* Sign Up link */}
          <p className="text-center text-[#5d5d5d] text-[15px]">
            Don't have an account?{" "}
            <button onClick={() => navigate("/crm/signup")} className="text-[#ff4e00] font-semibold hover:underline cursor-pointer">
              Sign Up
            </button>
          </p>


        </div>
      </div>
    </div>
  );
}