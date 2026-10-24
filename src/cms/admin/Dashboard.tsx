import type { AdminViewServerProps } from "payload";
import { Gutter } from "@payloadcms/ui";
import Link from "next/link";
import { dashboardCards, type Can, type Role } from "./dashboardCards";

type Perms = { collections?: Record<string, { read?: boolean } | undefined>; globals?: Record<string, { read?: boolean } | undefined> } | undefined;

const allowed = (entry: { read?: boolean } | undefined) => Boolean(entry && entry.read !== false);

/**
 * Start page of the admin: one large card per task, shown only when the signed-in person may use it. Server component: the role and
 * permissions come from the authenticated request, so nothing is decided on the client.
 */
export function Dashboard(props: AdminViewServerProps) {
  const { permissions, req } = props.initPageResult;
  const user = req.user as { name?: string | null; email?: string; role?: Role } | null;
  const role: Role = user?.role === "admin" ? "admin" : "editor";
  const perms = permissions as unknown as Perms;
  const can: Can = {
    collection: (slug) => allowed(perms?.collections?.[slug]),
    global: (slug) => allowed(perms?.globals?.[slug]),
  };
  const cards = dashboardCards(can, role);
  const who = user?.name || user?.email || "";

  return (
    <Gutter>
    <div className="hc-dashboard">
      <header className="hc-dashboard__intro">
        <p className="hc-eyebrow">Website Manager</p>
        <h1>Welcome{who ? `, ${who}` : ""}</h1>
        <p>
          Choose what you would like to edit. Every change follows four steps: <strong>edit</strong>, <strong>save changes</strong>,{" "}
          <strong>preview</strong> and <strong>publish</strong>. Visitors only see what has been published.
        </p>
        <p className="hc-note">
          {role === "admin"
            ? "You are an administrator: you can publish changes and manage team members."
            : "You are an editor: your changes stay as saved drafts until an administrator publishes them."}
        </p>
      </header>

      <ul className="hc-cards">
        {cards.map((card) => (
          <li key={card.id} className="hc-card" data-card={card.id}>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <div className="hc-card__links">
              {card.links.map((l) =>
                card.external ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hc-button">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} href={l.href} className="hc-button">
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          </li>
        ))}
      </ul>

      {role === "admin" ? (
        <p className="hc-footnote">
          <Link href="/admin/collections/users">Team members</Link> — add editors and change passwords.
        </p>
      ) : null}
    </div>
    </Gutter>
  );
}
