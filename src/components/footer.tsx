"use client";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "./logo";
import { Github, Mail, Phone } from "lucide-react";
import { profile, whatsappLink } from "@/lib/data";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-[1] mt-12 px-4 pb-10 sm:mt-16">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo size={32} withWordmark />
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
              <p className="mt-2 text-xs text-muted-foreground/80">{t("footer.made_with")}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("nav.projects")}
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-foreground text-muted-foreground">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-foreground text-muted-foreground">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-foreground text-muted-foreground">
                    {t("nav.projects")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground text-muted-foreground">
                    {t("nav.contact")}
                  </Link>
                </li>
                <li>
                  <Link to="/dev" rel="nofollow" className="hover:text-foreground text-muted-foreground">
                    {t("nav.dev")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("nav.contact")}
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    href={`mailto:${profile.email}`}
                  >
                    <Mail className="size-4" /> {profile.email}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Phone className="size-4" /> {profile.phone}
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="size-4" /> github.com/abbn7
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[var(--glass-border)] pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>© {year} {profile.name}. {t("footer.rights")}</span>
            <span className="font-mono">AN · v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
