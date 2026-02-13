export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[320px] rounded-xl bg-white p-8 shadow-lg text-center">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Login
        </h1>

        <button
          className="
            w-full
            flex items-center justify-center gap-3
            rounded-lg border border-gray-300
            bg-white px-4 py-3
            text-gray-700 font-medium
            hover:bg-gray-50
            transition
          "
        >
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
