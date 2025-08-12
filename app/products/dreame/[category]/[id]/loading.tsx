import { Skeleton } from "@/components/ui/skeleton"
import Header from "../../../../header-component"

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header scrolled={true} />
      <div className="container mx-auto px-4 py-16 pt-24">
        <Skeleton className="h-6 w-48 mb-8" /> {/* Back button skeleton */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Skeleton */}
          <Skeleton className="w-full h-[400px] md:h-[550px] rounded-xl" />

          {/* Details Skeleton */}
          <div className="space-y-8">
            <Skeleton className="h-10 w-3/4 mb-4" /> {/* Title skeleton */}
            <Skeleton className="h-24 w-full" /> {/* Description skeleton */}
            {/* Features Card Skeleton */}
            <div className="border rounded-xl p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            {/* Specs Card Skeleton */}
            <div className="border rounded-xl p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            {/* Support Section Skeleton */}
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
