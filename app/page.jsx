export const runtime = "edge";

import { getImages } from '@/lib/imageService';
import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import ReviewSection from '@/components/ReviewSection';
import Footer from '@/components/Footer';

export default async function HomePage() {
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  const images = await getImages();

  return (
    <div className="min-h-screen flex flex-col">
      {images.hero && <HeroSection image={images.hero} />}
      <div className="flex flex-col md:flex-row">
        {images.cricket && (
          <SportsSection 
            title="Cricket" 
            image={images.cricket} 
            buttonText="Explore Cricket"
            href="cricket"
          />
        )}
        {images.football && (
          <SportsSection 
            title="Football" 
            image={images.football} 
            buttonText="Discover Football"
            href="football"
          />
        )}
      </div>
      <ReviewSection />
      <Footer />
    </div>
  );
}