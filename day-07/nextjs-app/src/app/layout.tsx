import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PugWork | People Ops",
  description: "PugWork employee directory and workforce operations dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <Link className="brand" href="/employees" aria-label="PugWork home">
              <span className="brand-mark">P</span>
              <span>PugWork<span className="brand-dot">.</span><small>PEOPLE OPERATIONS</small></span>
            </Link>
            <nav className="topnav" aria-label="Main navigation">
              <Link href="/employees">Employees</Link>
              <Link className="nav-cta" href="/employees/create">+ Add employee</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <span>© {new Date().getFullYear()} PugWork</span>
            <span>People operations, made clearer.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
