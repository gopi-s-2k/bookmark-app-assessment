"use client";

import BookmarkForm from "@/app/components/BookmarkForm";
import BookmarkList from "@/app/components/BookmarkList";

export default function BookmarksPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Bookmarks</h1>
      <BookmarkForm />
      <BookmarkList />
    </div>
  )
}
