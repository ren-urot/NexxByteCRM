import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { NexxByteLogo } from "./NexxByteLogo";
import { CRM_CONFIGS, type CrmType, type PlanId, PLAN_DETAILS } from "./CrmContext";
import { useAuth } from "./AuthContext";
const imgFlower = "https://images.unsplash.com/photo-1694620133074-44180d9bd5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZXMlMjBmbG93ZXIlMjBib3VxdWV0JTIwc2hvcHxlbnwxfHx8fDE3NzM1NjA4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
import { Zap, Star, Crown, Check, ArrowRight, ArrowLeft, Mail, RefreshCw, ShieldCheck } from "lucide-react";

const plans: { id: PlanId; name: string; icon: typeof Zap; price: string; period: string; description: string; features: string[]; popular: boolean }[] = [
  {
    id: "free",
    name: "Free Trial",
    icon: Zap,
    price: "P0",
    period: "for 14 days",
    description: "Try all features free for 14 days",
    features: ["Up to 50 customers", "Basic POS", "Multiple CRM types", "Email support"],
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    icon: Star,
    price: "P999",
    period: "/month",
    description: "Perfect for small businesses",
    features: ["Up to 500 customers", "Full POS & inventory", "3 user accounts", "Delivery tracking", "Priority support"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    price: "P2,499",
    period: "/month",
    description: "For growing businesses",
    features: ["Unlimited customers", "Advanced analytics", "Unlimited users", "All modules included", "Delivery tracking", "24/7 phone support"],
    popular: false,
  },
];

const crmTypes: CrmType[] = ["finance", "realestate", "retail", "hospitality", "flowershop"];

const steps = [
  { num: 1, label: "Choose Plan" },
  { num: 2, label: "Select CRM" },
  { num: 3, label: "Account Details" },
  { num: 4, label: "Verify Email" },
  { num: 5, label: "Confirm" },
];

export function CrmSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  // Pre-select plan from URL params (from pricing page)
  const preselectedPlan = (searchParams.get("plan") || "basic") as PlanId;

  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    (["free", "basic", "premium"].includes(preselectedPlan) ? preselectedPlan : "basic") as PlanId
  );
  const [selectedCrmType, setSelectedCrmType] = useState<CrmType>("flowershop");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", businessName: "" });

  // Email verification state
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Generate a random 6-digit code
  const generateCode = useCallback(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Auto-send code when entering step 4
  useEffect(() => {
    if (step === 4 && !generatedCode) {
      const code = generateCode();
      setResendCooldown(60);
      setIsSending(true);
      // Simulate sending delay
      setTimeout(() => setIsSending(false), 1500);
      console.log(`Verification code sent to ${formData.email}: ${code}`);
    }
  }, [step, generatedCode, generateCode, formData.email]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    
    // Handle paste of full code
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || "";
      }
      setOtpDigits(newDigits);
      setVerifyError("");
      // Focus last filled input
      const lastIndex = Math.min(pasted.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      // Auto-verify if all 6 digits filled
      if (newDigits.every((d) => d !== "")) {
        verifyCode(newDigits.join(""));
      }
      return;
    }

    newDigits[index] = value;
    setOtpDigits(newDigits);
    setVerifyError("");

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are filled
    if (newDigits.every((d) => d !== "")) {
      verifyCode(newDigits.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = (code: string) => {
    if (code === generatedCode) {
      setIsVerified(true);
      setVerifyError("");
    } else {
      setVerifyError("Invalid verification code. Please try again.");
      setIsVerified(false);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setOtpDigits(["", "", "", "", "", ""]);
    setVerifyError("");
    setIsVerified(false);
    const code = generateCode();
    setResendCooldown(60);
    setIsSending(true);
    setTimeout(() => setIsSending(false), 1500);
    console.log(`Verification code sent to ${formData.email}: ${code}`);
    inputRefs.current[0]?.focus();
  };

  const handleContinue = () => {
    if (step === 4) {
      // Must be verified to continue
      if (!isVerified) {
        setVerifyError("Please verify your email before continuing.");
        return;
      }
      setStep(5);
      return;
    }
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Save subscription to localStorage and redirect
      // Append new subscription to existing ones
      const existing = JSON.parse(localStorage.getItem("crm_subscriptions") || "[]");
      const newSub = {
        id: `sub_${Date.now()}`,
        plan: selectedPlan,
        planName: plans.find((p) => p.id === selectedPlan)?.name || "Basic",
        crmType: selectedCrmType,
        businessName: formData.businessName || "My Business",
        createdAt: new Date().toISOString().split("T")[0],
      };
      const updated = [...existing, newSub];
      localStorage.setItem("crm_subscriptions", JSON.stringify(updated));
      localStorage.setItem("crm_active_sub", newSub.id);
      // Log in the user with their name and email from the signup form
      login(formData.email, formData.name);
      navigate("/crm/dashboard");
      // Force page reload to pick up new subscriptions
      window.location.href = "/app/crm/dashboard";
    }
  };

  const handleBack = () => {
    if (step === 4) {
      // Reset verification state when going back
      setOtpDigits(["", "", "", "", "", ""]);
      setIsVerified(false);
      setVerifyError("");
      setGeneratedCode("");
    }
    if (step > 1) setStep(step - 1);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)!;
  const selectedCrmConfig = CRM_CONFIGS[selectedCrmType];

  const getButtonLabel = () => {
    if (step === 1) return `Continue with ${selectedPlanData.name}`;
    if (step === 2) return `Continue with ${selectedCrmConfig.name}`;
    if (step === 3) return "Continue";
    if (step === 4) return isVerified ? "Continue to Review" : "Verify to Continue";
    return "Create Account & Launch CRM";
  };

  return (
    <div className="flex min-h-screen font-['Inter',sans-serif]">
      {/* Left Panel */}
      <div className="flex-1 overflow-auto relative px-6 md:px-12 py-10">
        <div className="max-w-[600px] mx-auto">
          {/* Back to website */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[#9a9a9a] text-[13px] hover:text-[#5d5d5d] transition-colors cursor-pointer mb-5"
          >
            <ArrowLeft size={14} />
            Back to website
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <NexxByteLogo size={28} />
            <div className="w-[2px] h-[28px] bg-[#ff4e00]" />
            <p className="text-[#383838] text-[20px] font-medium">CRM</p>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-0.5 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-0.5">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                    step > s.num
                      ? "bg-[#22c55e] text-white cursor-pointer"
                      : step === s.num
                      ? "bg-[#ff4e00] text-white"
                      : "bg-[#e0e0e0] text-[#9a9a9a]"
                  }`}
                >
                  {step > s.num ? <Check size={12} /> : s.num}
                </button>
                <span className={`hidden sm:inline text-[12px] whitespace-nowrap ${step >= s.num ? "text-[#383838] font-medium" : "text-[#9a9a9a]"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="w-3 h-px bg-[#e0e0e0] mx-0.5 shrink-0" />}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Plan */}
          {step === 1 && (
            <>
              <h1 className="text-[#383838] text-[28px] font-semibold leading-tight mb-1">Choose Your Plan</h1>
              <p className="text-[#9a9a9a] text-[15px] mb-8">Select the plan that best fits your business needs.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isSelected = selectedPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative rounded-[16px] p-5 text-left border-2 transition-all cursor-pointer ${
                        isSelected ? "border-[#ff4e00] bg-white shadow-lg" : "border-[#e8e8e8] bg-white hover:border-[#ffb080]"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4e00] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#fff0e6]" : "bg-[#f5f5f5]"}`}>
                          <Icon size={16} className={isSelected ? "text-[#ff4e00]" : "text-[#9a9a9a]"} />
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-[#ff4e00] bg-[#ff4e00]" : "border-[#d0d0d0]"}`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <p className={`text-[14px] font-semibold mb-1 ${isSelected ? "text-[#ff4e00]" : "text-[#383838]"}`}>{plan.name}</p>
                      <div className="mb-2">
                        <span className="text-[24px] font-semibold text-[#383838]">{plan.price}</span>
                        <span className="text-[13px] text-[#9a9a9a]">{plan.period}</span>
                      </div>
                      <p className="text-[12px] text-[#9a9a9a] mb-3">{plan.description}</p>
                      <div className="space-y-1.5">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-start gap-1.5">
                            <Check size={14} className={isSelected ? "text-[#ff4e00] mt-0.5" : "text-[#9a9a9a] mt-0.5"} />
                            <span className="text-[12px] text-[#5d5d5d]">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 2: Select CRM Type */}
          {step === 2 && (
            <>
              <h1 className="text-[#383838] text-[28px] font-semibold leading-tight mb-1">Select Your CRM Type</h1>
              <p className="text-[#9a9a9a] text-[15px] mb-2">
                Choose the industry CRM for your <span className="font-medium text-[#ff4e00]">{selectedPlanData.name}</span> subscription.
              </p>
              <p className="text-[#b0b0b0] text-[13px] mb-8">You can add more CRM types to your account anytime from Settings.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {crmTypes.map((typeId) => {
                  const c = CRM_CONFIGS[typeId];
                  const isSelected = selectedCrmType === typeId;
                  const CrmIcon = c.icon;
                  return (
                    <button
                      key={typeId}
                      onClick={() => setSelectedCrmType(typeId)}
                      className={`relative rounded-[16px] p-5 text-left border-2 transition-all cursor-pointer ${
                        isSelected ? "shadow-lg" : "border-[#e8e8e8] hover:border-[#ccc]"
                      }`}
                      style={isSelected ? { borderColor: c.color } : {}}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                          style={{ backgroundColor: c.colorLight }}
                        >
                          <CrmIcon size={22} style={{ color: c.color }} />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "text-white" : "border-[#d0d0d0]"
                          }`}
                          style={isSelected ? { borderColor: c.color, backgroundColor: c.color } : {}}
                        >
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                      <p className="text-[#383838] text-[15px] font-semibold mb-1">{c.name}</p>
                      <p className="text-[#9a9a9a] text-[12px] mb-3">
                        Manage {c.customerLabelPlural.toLowerCase()}, track {c.saleLabel.toLowerCase()}s, and grow your business.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {c.extraModules.map((m) => (
                          <span
                            key={m.label}
                            className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ backgroundColor: c.colorLight, color: c.color }}
                          >
                            {m.label}
                          </span>
                        ))}
                        {c.extraFields.slice(0, 1).map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#f0f0f0] text-[#666]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 3: Account Details */}
          {step === 3 && (
            <>
              <h1 className="text-[#383838] text-[28px] font-semibold leading-tight mb-1">Account Details</h1>
              <p className="text-[#9a9a9a] text-[15px] mb-8">Fill in your information to create your account.</p>

              {/* Summary Banner */}
              <div className="flex items-center gap-3 p-4 rounded-[14px] border border-[#e8e8e8] bg-[#fafafa] mb-6">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: selectedCrmConfig.colorLight }}>
                  <selectedCrmConfig.icon size={20} style={{ color: selectedCrmConfig.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#383838] text-[14px] font-semibold truncate">{selectedCrmConfig.name}</p>
                  <p className="text-[#9a9a9a] text-[12px]">{selectedPlanData.name} Plan &middot; {selectedPlanData.price}{selectedPlanData.period}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Business Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Bloom & Petal"
                    className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[15px] outline-none focus:border-[#ff4e00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[15px] outline-none focus:border-[#ff4e00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@bloomshop.com"
                    className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[15px] outline-none focus:border-[#ff4e00] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+63 912 345 6789"
                      className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[15px] outline-none focus:border-[#ff4e00] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#383838] text-[14px] font-medium mb-1.5">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a password"
                      className="w-full h-[48px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[10px] px-4 text-[15px] outline-none focus:border-[#ff4e00] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 4: Verify Email */}
          {step === 4 && (
            <>
              <h1 className="text-[#383838] text-[28px] font-semibold leading-tight mb-1">Verify Your Email</h1>
              <p className="text-[#9a9a9a] text-[15px] mb-8">
                We sent a 6-digit verification code to your email address.
              </p>

              {/* Email Icon + Address Card */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isVerified ? "bg-[#dcfce7]" : "bg-[#fff0e6]"}`}>
                  {isVerified ? (
                    <ShieldCheck size={32} className="text-[#22c55e]" />
                  ) : (
                    <Mail size={32} className="text-[#ff4e00]" />
                  )}
                </div>
                {isVerified ? (
                  <div>
                    <p className="text-[#22c55e] text-[18px] font-semibold mb-1">Email Verified!</p>
                    <p className="text-[#9a9a9a] text-[14px]">
                      <span className="font-medium text-[#383838]">{formData.email || "your email"}</span> has been verified successfully.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#383838] text-[15px] mb-1">Enter the code sent to</p>
                    <p className="text-[#ff4e00] text-[16px] font-semibold">{formData.email || "your email"}</p>
                    {isSending && (
                      <p className="text-[#9a9a9a] text-[13px] mt-2 animate-pulse">Sending verification code...</p>
                    )}
                  </div>
                )}
              </div>

              {/* DEV: Show verification code for testing */}
              {!isVerified && generatedCode && (
                <div className="mx-auto mb-6 px-4 py-2.5 rounded-[10px] bg-[#fffbe6] border border-[#ffe58f] max-w-fit">
                  <p className="text-[#ad6800] text-[12px] font-medium mb-0.5">🔑 Dev Mode: Your verification code</p>
                  <p className="text-[#ad6800] text-[22px] font-bold tracking-[6px] text-center">{generatedCode}</p>
                </div>
              )}

              {/* OTP Input */}
              {!isVerified && (
                <div className="flex flex-col items-center mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 mb-3">
                    {otpDigits.map((d, i) => (
                      <span key={i} className="contents">
                        <input
                          ref={(el) => { inputRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          value={d}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={(e) => {
                            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                            if (pasted.length > 1) {
                              e.preventDefault();
                              handleOtpChange(0, pasted);
                            }
                          }}
                          maxLength={1}
                          className={`w-[42px] h-[50px] sm:w-[52px] sm:h-[60px] rounded-[12px] border-2 text-[20px] sm:text-[24px] font-semibold text-center outline-none transition-all ${
                            d
                              ? "border-[#ff4e00] bg-[#fff8f4]"
                              : "border-[#e0e0e0] bg-[#f6f6f6] focus:border-[#ff4e00] focus:bg-white"
                          }`}
                        />
                        {i === 2 && <span className="text-[#d0d0d0] text-[24px] font-light mx-0.5 sm:mx-1">-</span>}
                      </span>
                    ))}
                  </div>
                  {verifyError && (
                    <p className="text-[#ef4444] text-[13px] mt-1">{verifyError}</p>
                  )}
                </div>
              )}

              {/* Resend Section */}
              {!isVerified && (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[#9a9a9a] text-[13px]">Didn't receive the code?</p>
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className={`text-[14px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      resendCooldown > 0
                        ? "text-[#b0b0b0] cursor-not-allowed"
                        : "text-[#ff4e00] hover:text-[#e64500]"
                    }`}
                  >
                    <RefreshCw size={14} className={resendCooldown > 0 ? "" : "hover:rotate-180 transition-transform duration-500"} />
                    {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend Code"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <>
              <h1 className="text-[#383838] text-[28px] font-semibold leading-tight mb-1">Confirm Your Subscription</h1>
              <p className="text-[#9a9a9a] text-[15px] mb-8">Review your selections before launching your CRM.</p>

              <div className="space-y-4 mb-8">
                {/* Plan Summary */}
                <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
                  <p className="text-[#9a9a9a] text-[12px] uppercase tracking-wider font-medium mb-3">Subscription Plan</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#fff0e6] flex items-center justify-center">
                      {(() => { const Icon = selectedPlanData.icon; return <Icon size={20} className="text-[#ff4e00]" />; })()}
                    </div>
                    <div>
                      <p className="text-[#383838] text-[16px] font-semibold">{selectedPlanData.name}</p>
                      <p className="text-[#9a9a9a] text-[14px]">{selectedPlanData.price} {selectedPlanData.period}</p>
                    </div>
                  </div>
                </div>

                {/* CRM Type Summary */}
                <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
                  <p className="text-[#9a9a9a] text-[12px] uppercase tracking-wider font-medium mb-3">CRM Type</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                      style={{ backgroundColor: selectedCrmConfig.colorLight }}
                    >
                      <selectedCrmConfig.icon size={20} style={{ color: selectedCrmConfig.color }} />
                    </div>
                    <div>
                      <p className="text-[#383838] text-[16px] font-semibold">{selectedCrmConfig.name}</p>
                      <p className="text-[#9a9a9a] text-[13px]">
                        {selectedCrmConfig.customerLabelPlural} &middot; {selectedCrmConfig.leadLabel}s &middot; {selectedCrmConfig.saleLabel}s
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedCrmConfig.extraModules.map((m) => (
                      <span
                        key={m.label}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: selectedCrmConfig.colorLight, color: selectedCrmConfig.color }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Account Summary */}
                <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-5">
                  <p className="text-[#9a9a9a] text-[12px] uppercase tracking-wider font-medium mb-3">Account</p>
                  <div className="space-y-2">
                    {formData.businessName && (
                      <div className="flex justify-between text-[14px]">
                        <span className="text-[#9a9a9a]">Business</span>
                        <span className="text-[#383838] font-medium">{formData.businessName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#9a9a9a]">Name</span>
                      <span className="text-[#383838] font-medium">{formData.name || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#9a9a9a]">Email</span>
                      <span className="text-[#383838] font-medium">{formData.email || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="h-[52px] px-5 bg-[#f5f5f5] text-[#5d5d5d] text-[15px] font-medium rounded-[10px] hover:bg-[#eee] active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              onClick={handleContinue}
              disabled={step === 4 && !isVerified}
              className={`flex-1 h-[52px] text-[16px] font-semibold rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                step === 4 && !isVerified
                  ? "bg-[#e0e0e0] text-[#9a9a9a] cursor-not-allowed shadow-none"
                  : step === 4 && isVerified
                  ? "bg-[#22c55e] text-white hover:bg-[#16a34a]"
                  : "bg-[#ff4e00] text-white hover:bg-[#e64500]"
              }`}
            >
              {step === 4 && isVerified && <ShieldCheck size={18} />}
              {getButtonLabel()}
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-[#e0e0e0]" />
            <span className="text-[#b0b0b0] text-[13px]">or</span>
            <div className="flex-1 h-px bg-[#e0e0e0]" />
          </div>

          <p className="text-center text-[#5d5d5d] text-[15px]">
            Already have an account?{" "}
            <button onClick={() => navigate("/crm/login")} className="text-[#ff4e00] font-semibold hover:underline cursor-pointer">
              Log In
            </button>
          </p>
        </div>
      </div>

      {/* Right - Image Panel */}
      <div className="hidden md:block md:w-[35%] lg:w-[40%] relative">
        <img src={imgFlower} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: `${selectedCrmConfig.color}55` }} />
        <div className="absolute bottom-12 left-10 right-10">
          <p className="text-white/90 text-center text-[16px] leading-[24px]">
            {step === 1 && "Pick the perfect plan for your business. Upgrade or downgrade anytime."}
            {step === 2 && `Get a CRM built for your industry with specialized fields, modules, and workflows.`}
            {step === 3 && "Set up takes less than a minute. Start managing your business smarter."}
            {step === 4 && "Enter the verification code sent to your email."}
            {step === 5 && "You're all set! Your CRM will be ready instantly after confirmation."}
          </p>
        </div>
      </div>
    </div>
  );
}