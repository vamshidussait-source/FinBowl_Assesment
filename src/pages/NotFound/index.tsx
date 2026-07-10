import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6FC] px-6">
      <div className="max-w-md rounded-[24px] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6D4CFF]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-gray-500">
          The page you are looking for does not exist or may have moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#6D4CFF] px-4 py-2 font-medium text-white"
        >
          <ArrowLeft size={16} />
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
