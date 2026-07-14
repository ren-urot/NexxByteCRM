import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

// The marketing /signup route now redirects to /crm/signup with plan param
export function SignupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const plan = searchParams.get("plan") || "basic";
    // Map old plan names to new plan IDs
    const planMap: Record<string, string> = {
      "free-trial": "free",
      "free": "free",
      "basic": "basic",
      "premium": "premium",
    };
    const mappedPlan = planMap[plan] || "basic";
    navigate(`/crm/signup?plan=${mappedPlan}`, { replace: true });
  }, [searchParams, navigate]);

  return null;
}
