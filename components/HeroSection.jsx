import Image from 'next/image';

export default function HeroSection({ image }) {
  const renderImage = () => {
    if (!image || !image.image) {
      return null;
    }

    if (typeof image.image === 'string' ) {
      return (
        <img 
          src={`data:image/png;base64,${image.image}`}
          alt={image.altText || "Hero image"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    return (
      <Image
        src={image.image}
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