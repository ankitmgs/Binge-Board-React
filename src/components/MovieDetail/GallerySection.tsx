import MovieDetailsGallery from "./MovieDetailsGallery";

interface GallerySectionProps {
  images: string[];
  status?: string;
}

const GallerySection = ({ images, status }: GallerySectionProps) => (
  <div className="mt-8 sm:mt-12">
    <div data-orientation="horizontal" role="none" className="shrink-0 bg-[#414158] h-[1px] w-full my-6 sm:my-8" />
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#9174e7]">Gallery</h2>
    <div className="relative overflow-hidden w-full whitespace-nowrap rounded-md pb-4" style={{ position: "relative" }}>
      <MovieDetailsGallery images={images} />
    </div>
    {status && (
      <div className="my-6 sm:my-8">
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-[#414158] h-[1px] w-full" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 mt-6 text-[#9174e7]">Status</h2>
        <p className="text-base md:text-lg text-[#8585ad]">{status}</p>
      </div>
    )}
  </div>
);

export default GallerySection;
