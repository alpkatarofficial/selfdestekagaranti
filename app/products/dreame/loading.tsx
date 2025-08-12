export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16">
          <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-12 w-96 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 w-full max-w-3xl bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="flex justify-center gap-4">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Value Proposition Skeleton */}
        <div className="bg-gray-100 rounded-2xl p-8 md:p-12 mb-16">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-56 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
