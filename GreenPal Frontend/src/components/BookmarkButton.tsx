"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkButtonProps {
  slug: string;
}

export default function BookmarkButton({ slug }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(slug);

  return (
    <button
      onClick={() => toggleBookmark(slug)}
      className="absolute right-4 top-19.5 flex h-6 w-6 items-center justify-center transition-transform active:scale-90"
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={bookmarked ? "filled" : "outline"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`material-symbols-rounded text-on-primary ${
            bookmarked ? "material-symbols-rounded--filled" : ""
          }`}
          style={{
            fontVariationSettings: bookmarked ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          bookmark
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
