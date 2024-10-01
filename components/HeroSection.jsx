export default function HeroSection({ image }) {
  return (
    <div className="relative h-[50vh] md:h-[70vh] lg:h-screen w-full">
      {image && image.image ? (
        <img
          src={typeof image.image === 'string' ? `data:image/png;base64,${image.image}` : image.image}
          alt={image.altText || "Hero image"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">Loading image...</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center px-4">
          Experience the game
        </h1>
      </div>
    </div>
  );
}