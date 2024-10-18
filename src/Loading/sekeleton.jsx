import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        {/* Skeleton for the image */}
        <Skeleton className="w-full h-64" />

        <div className="p-6">
          {/* Skeleton for the title */}
          <Skeleton className="h-6 w-48 mb-4" />

          {/* Skeleton for the origin text */}
          <Skeleton className="h-4 w-24 mb-2" />

          {/* Skeleton for the color text */}
          <Skeleton className="h-4 w-32 mb-2" />

          {/* Skeleton for the details text */}
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
