"use client";

import { useActionState, useEffect } from "react";
import { addBookmarkAction, editBookmarkAction } from "@/app/actions";
import { mutate } from "swr";


export default function BookmarkForm({ isOpen, onClose, editData }: any) {
  // If editData exists, we bind the ID to the edit action
  const action = editData
    ? editBookmarkAction.bind(null, editData.id)
    : addBookmarkAction;


  async function submitHandler(prevState: any, formData: FormData) {
    if (editData) {
      // Call edit with the bound ID
      return editBookmarkAction(editData.id, prevState, formData);
    } else {
      // Call add
      return addBookmarkAction(prevState, formData);
    }
  }

  const [state, formAction, isPending] = useActionState(submitHandler, null);

  useEffect(() => {
    if (isOpen && state?.success) {
      onClose();
      mutate("/api/bookmarks");
    }
  }, [state, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {editData ? "Edit Bookmark" : "New Bookmark"}
        </h3>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
            <input
              name="title"
              required
              defaultValue={editData?.title || ""}
              placeholder="e.g. GitHub"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL</label>
            <input
              name="url"
              required
              defaultValue={editData?.url || ""}
              placeholder="https://..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-gray-600 font-semibold">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}