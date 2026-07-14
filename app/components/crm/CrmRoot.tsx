import { Outlet } from "react-router";
import { CrmProvider } from "./CrmContext";
import { AuthProvider } from "./AuthContext";

/* CRM Root — provides Auth + CRM context to all /crm/* routes */
export function CrmRoot() {
  return (
    <AuthProvider>
      <CrmProvider>
        <Outlet />
      </CrmProvider>
    </AuthProvider>
  );
}