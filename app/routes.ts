import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { SignupPage } from "./components/SignupPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { CrmRoot } from "./components/crm/CrmRoot";
import { CrmLogin } from "./components/crm/CrmLogin";
import { CrmSignup } from "./components/crm/CrmSignup";
import { CrmTypeSelector } from "./components/crm/CrmTypeSelector";
import { CrmAppLayout } from "./components/crm/CrmAppLayout";
import { DashboardPage } from "./components/crm/pages/DashboardPage";
import { CustomersPage } from "./components/crm/pages/CustomersPage";
import { LeadsPage } from "./components/crm/pages/LeadsPage";
import { SalesPage } from "./components/crm/pages/SalesPage";
import { ReportsPage } from "./components/crm/pages/ReportsPage";
import { SettingsPage } from "./components/crm/pages/SettingsPage";
import { ExtraModulePage } from "./components/crm/pages/ExtraModulePage";
import { PosPage } from "./components/crm/pages/PosPage";
import { AppointmentsPage } from "./components/crm/pages/AppointmentsPage";
import { AdminUsersPage } from "./components/crm/pages/AdminUsersPage";
import { InventoryPage } from "./components/crm/pages/InventoryPage";
import { DeliveriesPage } from "./components/crm/pages/DeliveriesPage";

// Route configuration — all CRM routes share CrmRoot context providers
export const router = createBrowserRouter([
  // Landing Page (no CRM context needed)
  { path: "/", Component: LandingPage },
  { path: "/signup", Component: SignupPage },
  { path: "/about", Component: AboutPage },
  { path: "/contact", Component: ContactPage },

  // All CRM routes wrapped in CrmRoot which provides CrmProvider
  {
    path: "/crm",
    Component: CrmRoot,
    children: [
      // Auth pages
      { path: "login", Component: CrmLogin },
      { path: "signup", Component: CrmSignup },
      { path: "select-type", Component: CrmTypeSelector },

      // CRM App (sidebar layout) — layout route (no path)
      {
        Component: CrmAppLayout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "dashboard", Component: DashboardPage },
          { path: "customers", Component: CustomersPage },
          { path: "leads", Component: LeadsPage },
          { path: "sales", Component: SalesPage },
          { path: "reports", Component: ReportsPage },
          { path: "settings", Component: SettingsPage },
          // Dedicated POS page for flower shop and retail
          { path: "pos", Component: PosPage },
          // Dedicated Appointments page for hospital/clinic
          { path: "appointments", Component: AppointmentsPage },
          // Inventory page for retail and flowershop
          { path: "inventory", Component: InventoryPage },
          // Deliveries page for flowershop
          { path: "deliveries", Component: DeliveriesPage },
          // Admin internal pages
          { path: "admin/users", Component: AdminUsersPage },
          // Industry-specific extra modules (dynamic route)
          { path: ":module", Component: ExtraModulePage },
        ],
      },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, "") });