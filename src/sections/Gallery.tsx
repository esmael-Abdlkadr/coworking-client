import Button from "../components/ui/Button";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useGetGallries } from "../hooks/services";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Gallery() {
  const [showFullGallery, setFullGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { galleries } = useGetGallries();
  if (!galleries) return null;

  return (
    <section className="relative bg-black/90 w-full py-16 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-orange-600 rounded-full blur-3xl opacity-30"
          animate={{ x: [0, 200, 0], y: [0, 200, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl opacity-30"
          animate={{ x: [0, -200, 0], y: [0, -200, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative px-6 md:px-12 lg:px-20 flex flex-col gap-12 z-10">
        <h2 className="uppercase text-xl md:text-2xl lg:text-3xl text-white/80 tracking-[5px] mb-4 md:mb-6">
          Gallery
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 capitalize">
            Photo gallery of our{" "}
            <span className="text-primary-100">coworking space</span>
          </h2>
          <Button
            title={showFullGallery ? "Show Less" : "View Full Gallery"}
            onClick={() => setFullGallery(!showFullGallery)}
          />
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="15px">
            {galleries?.data
              .slice(0, showFullGallery ? galleries.data.length : 6)
              .map(
                (image: { _id: string; imageUrl: string; altText: string }) => (
                  <motion.div
                    key={image._id}
                    className="relative group"
                    whileHover={{
                      scale: 1.05,
                      rotate: 1,
                      transition: { duration: 0.4 },
                    }}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.altText}
                      className="w-full h-[300px] object-cover rounded-2xl cursor-pointer shadow-lg group-hover:shadow-2xl group-hover:brightness-110 transition duration-300"
                    />
                    {/* Overlay for Hover Effect */}
                    <div
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center rounded-2xl  cursor-pointer"
                      onClick={() => setSelectedImage(image.imageUrl)}
                    >
                      <p className="text-white text-lg font-semibold">
                        View Image
                      </p>
                    </div>
                  </motion.div>
                )
              )}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Selected"
              className="max-w-3xl max-h-[80vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
