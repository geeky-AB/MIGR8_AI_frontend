"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  AccountCircleIcon,
  AddIcon,
  AnalyticsIcon,
  CompareIcon,
  DashboardIcon,
  DatasetIcon,
  HubIcon,
  RuleIcon,
  SettingsIcon,
} from "@/components/ui/icons";
import {
  SIDEBAR_FOOTER_NAV,
  SIDEBAR_NAV,
  type NavItem,
} from "@/data/dashboard";

const iconMap: Record<NavItem["icon"], ComponentType<{ className?: string }>> = {
  dashboard: DashboardIcon,
  dataset: DatasetIcon,
  rule: RuleIcon,
  compare: CompareIcon,
  hub: HubIcon,
  analytics: AnalyticsIcon,
  account: AccountCircleIcon,
  settings: SettingsIcon,
};

type AppSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (!href || href === "#") return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  nested = false,
  active,
  onNavigate,
}: {
  item: NavItem;
  nested?: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = iconMap[item.icon];
  const activeClasses = active
    ? "border-r-4 border-primary bg-primary-container/10 font-bold text-primary opacity-80"
    : "text-on-surface-variant hover:bg-surface-container-high";

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={[
        "flex items-center gap-4 rounded-lg px-4 py-2 transition-colors duration-150",
        activeClasses,
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <Icon className={nested ? "h-4 w-4" : "h-5 w-5"} />
      <span className="text-xs font-semibold uppercase tracking-[0.02em] leading-4">
        {item.label}
      </span>
    </Link>
  );
}

export function AppSidebar({ className = "", onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <nav
      className={[
        "flex h-full w-64 flex-col border-r border-outline-variant bg-surface px-4 py-6 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-container text-on-primary-container">
          <DatasetIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-primary">
            MIGR8 AI
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wide leading-4 text-on-surface-variant">
            Enterprise Migration
          </p>
        </div>
      </div>

      <Button type="button" size="md" fullWidth className="mb-6 gap-2">
        <AddIcon className="h-4 w-4" />
        New Migration
      </Button>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => (
          <div key={item.label} className="space-y-1">
            <NavLink
              item={item}
              active={isActivePath(pathname, item.href)}
              onNavigate={onNavigate}
            />
            {item.children ? (
              <div className="ml-4 space-y-1 border-l border-outline-variant/30 pl-2">
                {item.children.map((child) => (
                  <NavLink
                    key={child.label}
                    item={child}
                    nested
                    active={isActivePath(pathname, child.href)}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-1 border-t border-outline-variant pt-6">
        {SIDEBAR_FOOTER_NAV.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            active={isActivePath(pathname, item.href)}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}
