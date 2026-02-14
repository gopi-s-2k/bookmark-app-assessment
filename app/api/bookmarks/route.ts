// app/api/bookmarks/route.ts
import { supabase } from "@/lib/supabase";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

async function getAuthenticatedUser(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  return token?.user_uid as string | undefined;
}

export async function GET(req: NextRequest) {
  const userId = await getAuthenticatedUser(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // Optional: newest first

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(bookmarks);
}

export async function POST(req: NextRequest) {
  const userId = await getAuthenticatedUser(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, url } = await req.json();

    if (!title || !url) {
      return NextResponse.json({ error: "Missing title or url" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        user_id: userId,
        title,
        url,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: "Bookmark added", data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}