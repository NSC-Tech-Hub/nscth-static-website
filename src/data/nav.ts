export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Our Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
  {
    label: "GitHub",
    href: "https://github.com/NSC-Tech-Hub",
    external: true,
  },
];

function normalizePath(path: string): string {
  if (path === "" || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "") || "/";
}

export function isCurrentPage(pathname: string, href: string): boolean {
  if (/^https?:\/\//.test(href)) return false;
  return normalizePath(pathname) === normalizePath(href);
}
