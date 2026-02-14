import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { APP_CONFIG } from "./config/app";

export default function Home() {
  return (
    // Centers content vertically and horizontally
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          {APP_CONFIG.name}
        </h1>
        <div className="space-y-2">
          <p className="max-w-md mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            Store and manage your bookmarks safely!
          </p>
          <p className="max-w-md mx-auto text-sm font-medium text-blue-600 dark:text-blue-400">
            Instant sync • No reload overhead • Private access
          </p>
        </div>
      </div>

      {/* Dynamic CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <AuthButton />
      </div>

    </div>
  );
}

async function AuthButton() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <Link
        href="/bookmarks"
        className="px-8 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-full font-semibold hover:opacity-90 transition-all"
      >
        Go to Bookmarks
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all"
    >
      Login to Start
    </Link>
  );
}