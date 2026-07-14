import { useEffect } from "react";
import { useNavigate } from "react-router";

// CRM type selection is now part of the signup flow.
// This page redirects to signup for adding a new subscription.
export function CrmTypeSelector() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/crm/signup", { replace: true });
  }, [navigate]);
  return null;
}
