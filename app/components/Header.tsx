"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { APP_CONFIG } from "../config/app";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto flex h-14 max-w-7xl items-center px-6">

                <div className="flex-1 text-black font-semibold">
                    {APP_CONFIG.name}
                </div>

                <nav className="flex gap-6 text-sm font-medium text-gray-600">
                    <Link href="/bookmarks" className="hover:text-black">
                        Bookmarks
                    </Link>
                    <Link href="/about" className="hover:text-black">
                        About
                    </Link>
                </nav>

                <div className="flex flex-1 items-center justify-end gap-4">
                    {session?.user && (
                        <>
                            <span></span>
                            <span className="text-sm text-gray-700">
                                {session.user.name}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
