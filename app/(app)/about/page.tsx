import Link from "next/link";
import { APP_CONFIG } from "@/app/config/app";

export default function AboutPage() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        About {APP_CONFIG.name}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Purpose</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            This application is micro-challenge from Abstrabit Technologies.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Developer Contact</h3>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            <div>Gopinath</div>
                            <div>gopi.s.2k@gmail.com </div>
                            <div>9150877848</div>
                            <div>https://www.linkedin.com/in/gopinath2000</div>
                        </div>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Tech Stack Used</h3>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            <div>Next.js & React.js</div>
                            <div>Supabase for database</div>
                            <div>Google OAuth</div>
                        </div>
                    </div>

                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Warm Regards</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Thanks for your visit
                        </p>
                    </div>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>

                <footer className="pt-12 text-zinc-400 text-xs">
                    &copy; {new Date().getFullYear()} {APP_CONFIG.name}.
                </footer>
            </div>
        </div>
    );
}