"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FabAction = {
  id: string;
  label: string;
  href?: string;
  icon: string;
};

type FabMenuProps = {
  actions: FabAction[];
  onVoiceTrigger?: () => void;
};

export default function FabMenu({ actions, onVoiceTrigger }: FabMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-3 relative z-40">
        <AnimatePresence>
          {open && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-col items-end gap-3 mb-2"
            >
              {actions.map((action) => (
                <motion.div
                  key={action.id}
                  variants={{
                    visible: { opacity: 1, scale: 1, y: 0 },
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                  }}
                >
                  {action.id === "fab_voice" && onVoiceTrigger ? (
                    <button
                      type="button"
                      className="flex h-12 items-center gap-3 rounded-full bg-primary-container px-4 py-2 shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] transition-shadow active:shadow-none"
                      onClick={() => {
                        setOpen(false);
                        onVoiceTrigger();
                      }}
                    >
                      <span className="material-symbols-rounded text-[20px] text-on-primary-container leading-none">
                        {action.icon}
                      </span>
                      <span className="text-sm font-medium tracking-wide text-on-primary-container pr-1">
                        {action.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={action.href!}
                      prefetch
                      className="flex h-12 items-center gap-3 rounded-full bg-primary-container px-4 py-2 shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] transition-shadow active:shadow-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="material-symbols-rounded text-[20px] text-on-primary-container leading-none">
                        {action.icon}
                      </span>
                      <span className="text-sm font-medium tracking-wide text-on-primary-container pr-1">
                        {action.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_0px_rgba(0,0,0,0.3)] transition-transform active:scale-95"
          aria-label={open ? "Close actions" : "Open actions"}
          onClick={() => setOpen((current) => !current)}
        >
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            className="material-symbols-rounded text-on-primary"
          >
            {open ? "close" : "add"}
          </motion.span>
        </button>
      </div>
    </>
  );
}
