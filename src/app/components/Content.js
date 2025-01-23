"use client";

import { useRouter } from "next/navigation";

export default function Content({ children }) {
  const router = useRouter();

  // Check if the current route is `/result`
  const isResultPage = router.pathname === "/result";

  return (
    <main className="flex-grow">
      <div
        className={`${
          isResultPage ? "max-w-full" : "max-w-[90rem]"
        } mx-auto px-4 sm:px-6 lg:px-8 py-8`}
      >
        {/* Main Content */}
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
