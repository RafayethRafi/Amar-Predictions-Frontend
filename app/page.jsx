import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import ReviewSection from '@/components/ReviewSection';
import Footer from '@/components/Footer';

async function getImages() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const [heroRes, cricketRes, footballRes] = await Promise.all([
      fetch(`${api}/users/main_background_image`, { cache: 'no-store' }),
      fetch(`${api}/users/cricket_background_image`, { cache: 'no-store' }),
      fetch(`${api}/users/football_background_image`, { cache: 'no-store' })
    ]);

    if (heroRes.ok && cricketRes.ok && footballRes.ok) {
      const [heroData, cricketData, footballData] = await Promise.all([
        heroRes.json(),
        cricketRes.json(),
        footballRes.json()
      ]);

      return {
        hero: heroData,
        cricket: cricketData,
        football: footballData
      };
    } else {
      throw new Error('One or more image fetches failed');
    }
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return null;
  }
}

export default async function HomePage() {
  const images = await getImages();

  if (!images) {
    return <div className="text-center text-red-500 mt-4">Failed to load images. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection image={images.hero} />
      <div className="flex flex-col md:flex-row">
        <SportsSection 
          title="Cricket" 
          image={images.cricket} 
          buttonText="Explore Cricket"
        />
        <SportsSection 
          title="Football" 
          image={images.football} 
          buttonText="Discover Football"
        />
      </div>
      <ReviewSection />
      <Footer />
    </div>
  );
}