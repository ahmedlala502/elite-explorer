import { Languages, Moon, Sun } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function SiteControls({ className = "" }: { className?: string }) {
  const { c, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={toggleLang}
        aria-label={c.nav.language}
        title={c.nav.language}
        className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
      >
        <Languages className="size-3.5" />
        {c.meta.langShort}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={c.nav.theme}
        title={c.nav.theme}
        className="flex items-center justify-center rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
      >
        {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      </button>
    </div>
  );
}
