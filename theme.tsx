import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Appearance, ViewStyle } from "react-native";

type Scheme = "dark" | "light";

export type Theme = {
  colors: {
    background: string;
    card: string;
    text: string;
    muted: string;
    primary: string;
    primaryAlt: string;
    onPrimary: string;
    border: string;
  };
  spacing: { xs: number; sm: number; md: number; lg: number; xl: number };
  radii: { sm: number; md: number; lg: number; pill: number };
  elevation: { sm: ViewStyle; md: ViewStyle };
  typography: { h1: number; h3: number; body: number; button: number };
};

const shared = {
  spacing: { xs: 6, sm: 10, md: 14, lg: 20, xl: 28 },
  radii: { sm: 6, md: 10, lg: 14, pill: 999 },
  elevation: {
    sm: {
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    md: {
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
  },
  typography: { h1: 24, h3: 16, body: 14, button: 15 },
};

const dark: Theme = {
  ...shared,
  colors: {
    background: "#0B0F14",
    card: "#121823",
    text: "#E5E7EB",
    muted: "#9CA3AF",
    primary: "#22C55E",
    primaryAlt: "#16A34A",
    onPrimary: "#0B0F14",
    border: "#1F2937",
  },
};

const light: Theme = {
  ...shared,
  colors: {
    background: "#FFFFFF",
    card: "#F7F7F9",
    text: "#111827",
    muted: "#6B7280",
    primary: "#22C55E",
    primaryAlt: "#16A34A",
    onPrimary: "#FFFFFF",
    border: "#E5E7EB",
  },
};

type ThemeContextValue = {
  theme: Theme;
  scheme: Scheme;
  setScheme: (s: Scheme) => void;
  isLoggedIn: boolean;
  setLoggedIn: (b: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  scheme: initialScheme,
}: {
  children: React.ReactNode;
  scheme: Scheme;
}) {
  const [scheme, setScheme] = useState<Scheme>(initialScheme);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === "light" || colorScheme === "dark")
        setScheme(colorScheme);
    });
    return () => {
      // RN >=0.65
      // @ts-ignore - types variam por versão
      sub?.remove?.();
    };
  }, []);

  const theme = useMemo(() => (scheme === "dark" ? dark : light), [scheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, scheme, setScheme, isLoggedIn, setLoggedIn }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return { ...ctx.theme, scheme: ctx.scheme, setScheme: ctx.setScheme };
}

export function useSession() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useSession must be used within ThemeProvider");
  return { isLoggedIn: ctx.isLoggedIn, setLoggedIn: ctx.setLoggedIn };
}
