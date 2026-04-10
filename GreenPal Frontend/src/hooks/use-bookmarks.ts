"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "gs_tip_bookmarks";

export function useBookmarks() {
  const { value: bookmarks, setValue: setBookmarks } = useLocalStorage<string[]>(
    STORAGE_KEY,
    []
  );

  const toggleBookmark = useCallback(
    (slug: string) => {
      setBookmarks((prev) => {
        const exists = prev.includes(slug);
        return exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [setBookmarks]
  );

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
  };
}
