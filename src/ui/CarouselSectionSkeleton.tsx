import { Skeleton } from "./skeleton";

const CarouselSectionSkeleton = ({ icon }: { icon: any }) => {
  return (
    <div className="my-6 sm:my-8">
      <div className="mb-4 sm:mb-6 px-4"></div>
      <div className="px-4">
        <div className="flex space-x-4 overflow-hidden pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-44 sm:w-52 md:w-60 flex-shrink-0">
              <Skeleton className="h-56 sm:h-64 md:h-80 w-full rounded-lg bg-[#3d3d5280]" />
              <Skeleton className="h-6 w-3/4 mt-3 rounded-md bg-[#3d3d5280]" />
              <Skeleton className="h-4 w-1/2 mt-2 rounded-md bg-[#3d3d5280]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSectionSkeleton;
