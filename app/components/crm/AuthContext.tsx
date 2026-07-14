import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "admin" | "subscriber";

export interface AuthUser {
  name: string;
  email: string;
  initials: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

// Default fallback for HMR / React Fast Refresh boundary transitions
const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
};

const AuthCtx = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT);

// Internal NexxByte admin emails use @crmplatform.com domain
function detectRole(email: string): UserRole {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain === "crmplatform.com" ? "admin" : "subscriber";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("crm_auth_user");
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = (email: string, name?: string) => {
    const role = detectRole(email);
    const displayName = name || email.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const authUser: AuthUser = {
      name: displayName,
      email,
      initials: getInitials(displayName),
      role,
    };
    setUser(authUser);
    localStorage.setItem("crm_auth_user", JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crm_auth_user");
  };

  return (
    <AuthCtx.Provider value={{ user, isAdmin: user?.role === "admin", login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}