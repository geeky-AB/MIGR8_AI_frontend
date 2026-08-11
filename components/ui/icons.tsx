type IconProps = {
  className?: string;
};

function baseIconProps(className: string) {
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
}

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function LockIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function VisibilityOffIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M3 3l18 18" />
      <path d="M10.6 10.7a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A10.5 10.5 0 0 1 12 5c5 0 9.3 3.1 10.5 7.5a10.9 10.9 0 0 1-4.1 5.1" />
      <path d="M6.1 6.1A10.9 10.9 0 0 0 1.5 12.5 10.5 10.5 0 0 0 12 19c1.1 0 2.2-.2 3.2-.5" />
    </svg>
  );
}

export function VisibilityIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function DatasetIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

export function AddIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function DashboardIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

export function RuleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h14" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  );
}

export function CompareIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
      <path d="M16 4h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8" />
      <path d="M9 10h6" />
      <path d="M9 14h4" />
    </svg>
  );
}

export function HubIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M7 8.2 10.2 10.5" />
      <path d="M13.8 10.5 17 8.2" />
      <path d="M7 15.8 10.2 13.5" />
      <path d="M13.8 13.5 17 15.8" />
    </svg>
  );
}

export function AnalyticsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-3" />
    </svg>
  );
}

export function AccountCircleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19a7 7 0 0 1 14 0" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function SettingsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HelpOutlineIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function TrendingUpIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="m3 17 6-6 4 4 7-7" />
      <path d="M14 8h6v6" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function WarningIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="m12 3 10 18H2L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function DifferenceIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <rect x="4" y="4" width="10" height="10" rx="1" />
      <rect x="10" y="10" width="10" height="10" rx="1" />
    </svg>
  );
}

export function SyncIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M21 12a9 9 0 0 0-15-6.7" />
      <path d="M3 4v5h5" />
      <path d="M3 12a9 9 0 0 0 15 6.7" />
      <path d="M21 20v-5h-5" />
    </svg>
  );
}

export function InventoryIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M21 8H3l2-4h14l2 4Z" />
      <path d="M3 8v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

export function DraftIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

export function ArrowForwardIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function UploadFileIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M12 11v6" />
      <path d="m9 14 3-3 3 3" />
    </svg>
  );
}

export function SchemaIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...baseIconProps(className)}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.5 10.5 15" />
      <path d="M15.8 7.5 13.5 15" />
      <path d="M8.5 6h7" />
    </svg>
  );
}
