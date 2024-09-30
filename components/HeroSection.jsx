import Image from 'next/image';

export default function HeroSection({ image }) {
  const renderImage = () => {
    if (!image || !image.image) {
      return (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No image available</span>
        </div>
      );
    }

    const imageUrl = typeof image.image === 'string' 
      ? `data:image/png;base64,${image.image}`
      : image.image;

    return (
      <Image
        src={imageUrl}
        alt={image.altText || "Hero image"}
        layout="fill"
        objectFit="cover"
        priority
      />
    );
  };

  return (
    <div className="relative h-[50vh] md:h-[70vh] lg:h-screen w-full">
      {renderImage()}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold text-center px-4">
          Experience the game
        </h1>
      </div>
    </div>
  );
}