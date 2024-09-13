import Image from 'next/image';

export default function SportsSection({ title, image, buttonText }) {
  const renderImage = () => {
    if (!image || !image.image) {
      return null; // Or you could return a placeholder image
    }

    if (typeof image.image === 'string') {
      return (
        <div className="relative w-full h-full bg-gray-200">
          <img 
            src={`data:image/png;base64,${image.image}`}
            alt={image.altText || `${title} image`}
            className="object-contain w-full h-full"
          />
        </div>
      );
    }

    // Assume it's a URL if it's not base64
    return (
      <div className="relative w-full h-full bg-gray-200">
        <Image
          src={image.image}
          alt={image.altText || `${title} image`}
          layout="fill"
          objectFit="contain"
          sizes="(max-width: 768px) 100vw, 66.67vw"
        />
      </div>
    );
  };

  return (
    <div className="relative w-full">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        {renderImage()}
        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none" />
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-1/2 flex flex-col items-start justify-center p-6 text-white">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}