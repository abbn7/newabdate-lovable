"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Logo } from "./logo";
import { STACK, ARCH } from "@/lib/dev-manifest";

export function DevModeButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View developer mode"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto grid size-10 place-items-center rounded-full glass-strong shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      >
        <Code2 className="size-4 opacity-90" strokeWidth={1.75} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mb-3 w-[calc(100%-1.5rem)] max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain rounded-3xl glass-strong p-6 sm:mb-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Logo size={28} />
                  <div>
                    <div className="font-display text-2xl leading-tight">{t("dev.title")}</div>
                    <div className="text-xs text-muted-foreground">{t("dev.subtitle")}</div>
                  </div>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-full glass-subtle"
                >
                  <X className="size-4" />
                </button>
              </div>

              <section className="mt-6">
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("dev.arch")}
                </h4>
                <ul className="mt-2 space-y-1 font-mono text-xs text-foreground/80">
                  {ARCH.map((line) => (
                    <li key={line} className="opacity-90">
                      · {line}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-5">
                <h4 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("dev.libs")}
                </h4>
                <ul className="mt-2 grid grid-cols-1 gap-1.5 text-sm">
                  {STACK.map(([name, desc]) => (
                    <li
                      key={name}
                      className="flex items-baseline justify-between gap-3 border-b border-[var(--glass-border)] py-1.5"
                    >
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
