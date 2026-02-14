"use server";

import { supabase } from "@/lib/supabase";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Helper to verify user (Refactored for reuse)
async function getUserId() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const token = await getToken({
    req: {
      headers: Object.fromEntries(headersList.entries()),
      cookies: Object.fromEntries(cookieStore.getAll().map((c) => [c.name, c.value]))
    } as any,
    secret: process.env.NEXTAUTH_SECRET
  });
  return token?.user_uid as string | undefined;
}

// ADD: Must have prevState as the FIRST or SECOND arg depending on useActionState
export async function addBookmarkAction(prevState: any, formData: FormData) {
  const userId = await getUserId();
  if (!userId) return { error: "Unauthorized", success: false };

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  const { error } = await supabase.from("bookmarks").insert({
    user_id: userId,
    title,
    url,
  });

  if (error) return { error: error.message, success: false };

  revalidatePath("/bookmarks");
  return { success: true, error: null }; // Return consistent object
}

// EDIT: When bound or wrapped, ensure the signature matches submitHandler
export async function editBookmarkAction(id: string, prevState: any, formData: FormData) {
  const userId = await getUserId();
  if (!userId) return { error: "Unauthorized", success: false };

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  const { error } = await supabase
    .from("bookmarks")
    .update({ title, url })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return { error: error.message, success: false };

  revalidatePath("/bookmarks");
  return { success: true, error: null };
}

// DELETE: Kept as is, usually called via transition or simple click
export async function deleteBookmarkAction(id: string) {
  const userId = await getUserId();
  if (!userId) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return { error: error.message };
  revalidatePath("/bookmarks");
  return { success: true };
}