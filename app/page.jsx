export const runtime = "edge";

import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import ReviewSection from '@/components/ReviewSection';
import Footer from '@/components/Footer';

async function getImage(endpoint) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${api}${endpoint}`, { cache: 'no-store' });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch image from ${endpoint}:`, error);
    return null;
  }
}

async function getImages() {
  const [hero, cricket, football] = await Promise.all([
    getImage('/users/main_background_image'),
    getImage('/users/cricket_background_image'),
    getImage('/users/football_background_image')
  ]);

  return { hero, cricket, football };
}

export default async function HomePage() {
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