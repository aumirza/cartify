import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-gray-600">Could not find the requested resource</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
