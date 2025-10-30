import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        {/* Back button skeleton */}
        <Skeleton className="h-6 w-48 mb-8" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image skeleton */}
          <Skeleton className="w-full h-[400px] md:h-[550px] rounded-xl" />

          <div className="space-y-8">
            {/* Title skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>

            {/* Price skeleton */}
            <Skeleton className="h-20 w-full rounded-lg" />

            {/* Quick specs skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>

            {/* Features card skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>

            {/* Specs card skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
