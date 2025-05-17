
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  type: "product" | "category" | "banner" | "text";
  count?: number;
}

export const SkeletonLoader = ({ type, count = 1 }: SkeletonLoaderProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case "product":
        return (
          <div className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        );
      case "category":
        return (
          <div className="aspect-[3/4] w-full rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        );
      case "banner":
        return <Skeleton className="h-64 w-full rounded-lg" />;
      case "text":
        return <Skeleton className="h-4 w-full" />;
      default:
        return <Skeleton className="h-10 w-full" />;
    }
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse">
            {renderSkeleton()}
          </div>
        ))}
    </>
  );
};
