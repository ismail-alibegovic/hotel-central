"use client";

import { Link, NavGroup } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import type { NavLink, NavModel } from "./navItems";

const active = (pathname: string, href: string) => (href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

/** Pages created in the CMS belong to the "Pages" entry: it stays highlighted while one is open. */
const belongs = (pathname: string, l: NavLink) => active(pathname, l.href) || (l.id === "pages" && pathname.startsWith("/admin/collections/custom-pages"));

function Item({ l, pathname }: { l: NavLink; pathname: string }) {
  const on = belongs(pathname, l);
  const label = (
    <>
      {on ? <div className="nav__link-indicator" /> : null}
      <span className="nav__link-label">{l.label}</span>
    </>
  );
  return pathname === l.href ? (
    <div className="nav__link" id={`hc-nav-${l.id}`} aria-current="page">
      {label}
    </div>
  ) : (
    <Link className="nav__link" href={l.href} id={`hc-nav-${l.id}`} prefetch={false} aria-current={on ? "page" : undefined}>
      {label}
    </Link>
  );
}

export function SideNavLinks({ model }: { model: NavModel }) {
  const pathname = usePathname() ?? "";
  return (
    <div className="hc-sidenav" data-hc-sidenav>
      {model.top.map((l) => (
        <Item key={l.id} l={l} pathname={pathname} />
      ))}
      {model.sections.map((s) => (
        <NavGroup key={s.id} label={s.label} isOpen>
          {s.links.map((l) => (
            <Item key={l.id} l={l} pathname={pathname} />
          ))}
        </NavGroup>
      ))}
    </div>
  );
}
