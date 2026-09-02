import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Globe,
  LayoutGrid,
  LifeBuoy,
  MapPin,
  Megaphone,
  Menu,
  Moon,
  ScanLine,
  Search,
  Settings,
  Sun,
  User,
  Users,
  BarChart3,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { EliteWordmark } from "@/components/brand/EliteWordmark";
import { Toaster } from "@/components/ui/sonner";
import { workspace } from "@/lib/app-data";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Overview",
    items: [{ to: "/app", label: "Dashboard", icon: LayoutGrid, exact: true }],
  },
  {
    label: "Work",
    items: [
      { to: "/app/influencers", label: "Influencers", icon: Users },
      { to: "/app/campaigns", label: "Campaigns", icon: Megaphone, count: 3 },
      { to: "/app/branches", label: "Branches", icon: MapPin },
      { to: "/app/scanner", label: "Scanner", icon: ScanLine },
    ],
  },
  { label: "Insight", items: [{ to: "/app/reports", label: "Reports", icon: BarChart3 }] },
] as const;

const tabs = [
  { to: "/app", label: "Home", icon: LayoutGrid, exact: true },
  { to: "/app/influencers", label: "Creators", icon: Users },
  { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/app/reports", label: "Reports", icon: BarChart3 },
  { to: "/app/account", label: "Account", icon: User },
] as const;

const titles: Record<string, string> = {
  "/app": "Dashboard",
  "/app/influencers": "Influencers",
  "/app/campaigns": "Campaigns",
  "/app/branches": "Branches",
  "/app/scanner": "Scanner",
  "/app/reports": "Reports",
  "/app/account": "Account",
};

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => setSideOpen(false), [pathname]);

  /*
    The workspace runs its own dark ramp — cool obsidian rather than the site's
    warm noir. The wrapper below carries `workspace-theme`, so the palette is
    already right in the SSR'd HTML; this flag on <html> extends it to UI that
    portals out of the wrapper (toasts, menus).
  */
  useEffect(() => {
    document.documentElement.setAttribute("data-workspace", "");
    return () => document.documentElement.removeAttribute("data-workspace");
  }, []);

  /* Detail routes fall back to their section, so the bar never reads "Workspace". */
  const title =
    titles[pathname] ??
    (pathname.startsWith("/app/campaigns/")
      ? "Campaign"
      : pathname.startsWith("/app/influencers/")
        ? "Creator profile"
        : "Workspace");

  return (
    <div className="app-frame workspace-theme min-h-screen bg-[color:var(--surface-alt)] lg:grid lg:grid-cols-[16rem_1fr]">
      <Sidebar open={sideOpen} onClose={() => setSideOpen(false)} pathname={pathname} />

      <div className="flex min-h-screen min-w-0 flex-col">
        <AppBar title={title} onMenu={() => setSideOpen((v) => !v)} open={sideOpen} />
        <main
          id="main"
          className="mx-auto w-full max-w-[1240px] flex-1 px-5 pb-28 pt-7 lg:px-9 lg:pb-14 lg:pt-9"
        >
          <Outlet />
        </main>
      </div>

      <TabBar pathname={pathname} />
      <Toaster position="bottom-center" />
    </div>
  );
}

function isActive(pathname: string, to: string, exact?: boolean) {
  return exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);
}

function Sidebar({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-scrim/60 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        id="side"
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex w-64 flex-col border-e border-border bg-[color:var(--bg-raised)] shadow-[var(--shadow-float)] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none",
          // `rtl:translate-x-full` parks the drawer off the right edge on mobile;
          // without an RTL-specific reset it stayed parked at desktop too.
          open
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0 lg:rtl:translate-x-0",
        )}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
          <Link to="/app" aria-label="ELITƎ workspace">
            <EliteWordmark className="h-3.5 w-auto text-foreground" />
          </Link>
        </div>

        <nav aria-label="Workspace" className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-3 pb-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
                {section.label}
              </p>
              {section.items.map((item) => {
                const active = isActive(pathname, item.to, "exact" in item ? item.exact : false);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      // The rail is the affordance; the tint only supports it.
                      "group relative mb-0.5 flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? "bg-[color:var(--accent-soft)] text-[color:var(--accent-text)]"
                        : "text-muted-foreground hover:bg-[color:var(--bg-sunken)] hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-1.5 start-0 w-[3px] rounded-full bg-gold transition-transform duration-300",
                        active ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {"count" in item && item.count && (
                      <span
                        className={cn(
                          "ms-auto rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tabular-nums",
                          active
                            ? "bg-gold/20 text-[color:var(--accent-text)]"
                            : "bg-[color:var(--bg-sunken)] text-muted-foreground",
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <UserMenu />
      </aside>
    </>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item =
    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-[color:var(--bg-sunken)] hover:text-foreground [&>svg]:size-4";

  return (
    <div ref={wrap} className="relative border-t border-border p-3">
      {open && (
        <div
          id="user-menu"
          role="menu"
          className="float-surface absolute bottom-full start-3 end-3 mb-2 rounded-xl p-1.5"
        >
          <p className="px-3 py-2 text-[0.7rem] font-medium text-muted-foreground">
            {workspace.org} · {workspace.plan} Plan
          </p>
          <Link to="/app/account" onClick={() => setOpen(false)} role="menuitem" className={item}>
            <User /> Account &amp; profile
          </Link>
          <Link
            to="/app/account"
            hash="team"
            onClick={() => setOpen(false)}
            role="menuitem"
            className={item}
          >
            <Users /> Team &amp; permissions
          </Link>
          <Link
            to="/app/account"
            hash="settings"
            onClick={() => setOpen(false)}
            role="menuitem"
            className={item}
          >
            <Settings /> Workspace settings
          </Link>
          <hr className="my-1.5 border-border" />
          <Link to="/contact" onClick={() => setOpen(false)} role="menuitem" className={item}>
            <LifeBuoy /> Help &amp; support
          </Link>
          <Link to="/" onClick={() => setOpen(false)} role="menuitem" className={item}>
            <Globe /> Back to website
          </Link>
        </div>
      )}

      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="user-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-[10px] p-2 text-start transition-colors hover:bg-[color:var(--bg-sunken)]"
      >
        <img
          src={workspace.user.avatar}
          alt=""
          width={160}
          height={160}
          className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border"
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{workspace.user.name}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {workspace.org} · {workspace.user.role}
          </span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
      </button>
    </div>
  );
}

function AppBar({ title, onMenu, open }: { title: string; onMenu: () => void; open: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { dir, toggleLang, lang } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K for command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside notifications popover
  useEffect(() => {
    if (!notifOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!notifRef.current?.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [notifOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-[color:color-mix(in_oklab,var(--surface-alt)_78%,transparent)] px-4 backdrop-blur-xl lg:px-9">
      <button
        type="button"
        onClick={onMenu}
        aria-expanded={open}
        aria-controls="side"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-content-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold lg:hidden"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>

      <span className="truncate text-sm font-semibold tracking-[-0.01em]">{title}</span>

      {/* Global Quick Search Button */}
      <div className="relative ms-auto hidden max-w-xs flex-1 md:block">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex h-9 w-full items-center justify-between rounded-full border border-border bg-[color:var(--bg-raised)] px-3 text-xs text-muted-foreground transition-colors hover:border-[color:var(--border-strong)]"
        >
          <span className="flex items-center gap-2">
            <Search className="size-3.5" />
            <span>Search campaigns, creators...</span>
          </span>
          <kbd className="rounded border border-border bg-[color:var(--bg-sunken)] px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="ms-auto flex items-center gap-2 md:ms-0">
        <button
          type="button"
          onClick={toggleLang}
          aria-pressed={dir === "rtl"}
          aria-label="Switch layout direction"
          title="Switch layout direction"
          className="grid h-9 min-w-9 place-content-center rounded-full border border-border px-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
        >
          {lang === "en" ? "RTL" : "LTR"}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Switch theme"
          className="grid size-9 place-content-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label={`Notifications, ${unreadCount} unread`}
            className="relative grid size-9 place-content-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute end-2 top-2 size-1.5 rounded-full bg-gold" aria-hidden />
            )}
          </button>

          {notifOpen && (
            <div className="float-surface absolute end-0 top-full mt-2 w-80 rounded-2xl border border-border bg-[color:var(--bg-raised)] p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setUnreadCount(0)}
                    className="text-[0.7rem] text-gold hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="mt-3 flex flex-col gap-2.5">
                <Link
                  to="/app/campaigns"
                  onClick={() => setNotifOpen(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <p className="text-xs font-semibold">4 creators awaiting approval</p>
                  <p className="text-[0.7rem] text-muted-foreground">Rüya Riyadh · Season Launch</p>
                </Link>
                <Link
                  to="/app/campaigns"
                  onClick={() => setNotifOpen(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <p className="text-xs font-semibold">Beefbar Jeddah ends in 2 days</p>
                  <p className="text-[0.7rem] text-muted-foreground">
                    9 of 14 deliverables covered
                  </p>
                </Link>
                <Link
                  to="/app/reports"
                  onClick={() => setNotifOpen(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <p className="text-xs font-semibold">17 new verified story posts</p>
                  <p className="text-[0.7rem] text-muted-foreground">Uploaded in last 24h</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Command Palette Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-[color:var(--bg-raised)] p-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <Search className="size-5 text-gold" />
              <input
                type="text"
                autoFocus
                placeholder="Search campaigns, influencers, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-1 max-h-80 overflow-y-auto">
              <p className="px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                Quick Navigation
              </p>
              <Link
                to="/app/campaigns"
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 hover:text-gold"
              >
                <Megaphone className="size-4" />
                <span>Campaigns</span>
                <span className="ms-auto text-xs text-muted-foreground">3 active</span>
              </Link>
              <Link
                to="/app/influencers"
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 hover:text-gold"
              >
                <Users className="size-4" />
                <span>Influencer Network</span>
                <span className="ms-auto text-xs text-muted-foreground">85K+ creators</span>
              </Link>
              <Link
                to="/app/branches"
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 hover:text-gold"
              >
                <MapPin className="size-4" />
                <span>Branches &amp; Venues</span>
                <span className="ms-auto text-xs text-muted-foreground">6 locations</span>
              </Link>
              <Link
                to="/app/scanner"
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 hover:text-gold"
              >
                <ScanLine className="size-4" />
                <span>Door Check-in Scanner</span>
              </Link>
              <Link
                to="/app/reports"
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 hover:text-gold"
              >
                <BarChart3 className="size-4" />
                <span>Performance Reports</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function TabBar({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-[color:color-mix(in_oklab,var(--bg-raised)_92%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      {tabs.map((tab) => {
        const active = isActive(pathname, tab.to, "exact" in tab ? tab.exact : false);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex flex-col items-center gap-1 py-2.5 text-[0.65rem] font-medium transition-colors",
              active ? "text-gold" : "text-muted-foreground",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-5 top-0 h-[2px] rounded-full bg-gold transition-transform duration-300",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
            <Icon className="size-4" />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
