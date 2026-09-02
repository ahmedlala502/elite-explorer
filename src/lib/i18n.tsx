import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { content, type Content, type Lang } from "./content";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  c: Content;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Localise a market or category label. Brand names are never translated. */
  term: (kind: "markets" | "categories", value: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "elite-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "en" ? "ar" : "en")), []);

  const value = useMemo<I18nValue>(() => {
    const c = content[lang];
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      c,
      setLang,
      toggleLang,
      term: (kind, v) => c[kind][v] ?? v,
    };
  }, [lang, setLang, toggleLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
