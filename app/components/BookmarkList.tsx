"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { supabase } from "@/lib/supabase";
import { deleteBookmarkAction } from "@/app/actions";
import BookmarkForm from "./BookmarkForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BookmarkList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<any>(null);
  const [modalKey, setModalKey] = useState(0);


  const { data: bookmarks, error, isLoading } = useSWR("/api/bookmarks", fetcher);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-bookmarks")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookmarks" },
        () => mutate("/api/bookmarks")
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleEdit = (bookmark: any) => {
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBookmark(null);
    setIsModalOpen(true);
    setModalKey(Date.now());
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks?.map((b: any) => (
          <BookmarkCard key={b.id} bookmark={b} onEdit={() => handleEdit(b)} />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddNew}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-full shadow-xl font-medium z-40 hover:scale-105 transition-transform"
      >
        + Add Bookmark
      </button>

      <BookmarkForm
        key={selectedBookmark?.id || "new-form"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBookmark(null); // Clear the data so the next open is fresh
        }}
        editData={selectedBookmark}
      />
    </div>
  );
}

function BookmarkCard({ bookmark, onEdit }: any) {
  const handleDelete = async () => {
    if (confirm("Delete this bookmark?")) {
      const res = await deleteBookmarkAction(bookmark.id);
      if (res.success) mutate("/api/bookmarks");
    }
  };

  return (
    <div className="group relative p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{bookmark.title}</h4>
          <p className="text-sm text-zinc-500 truncate">{bookmark.url}</p>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Edit
          </button>
          <button onClick={handleDelete} className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}