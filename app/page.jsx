'use client'

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import ReviewSection from '@/components/ReviewSection';
import Footer from '@/components/Footer';

const getImages = async () => {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  console.log("Fetching images from API:", api);
  
  const endpoints = [
    '/users/main_background_image',
    '/users/cricket_background_image',
    '/users/football_background_image'
  ];
  
  try {
    const responses = await Promise.all(
      endpoints.map(endpoint => 
        fetch(`${api}${endpoint}`, {
          cache: 'no-store',
          headers: {
            'Accept': 'application/json'
          }
        })
      )
    );
    
    const data = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          console.error(`Failed to fetch: ${response.url}, Status: ${response.status}`);
          return null;
        }
        return response.json();
      })
    );
    
    return {
      hero: data[0],
      cricket: data[1],
      football: data[2]
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return {
      hero: null,
      cricket: null,
      football: null
    };
  }
};

export default function HomePage() {
  const [images, setImages] = useState({
    hero: null,
    cricket: null,
    football: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Starting to fetch images...");
        const fetchedImages = await getImages();
        console.log("Fetched images:", fetchedImages);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error in fetchImages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection image={images.hero} />
      <div className="flex flex-col md:flex-row">
        <SportsSection 
          title="Cricket" 
          image={images.cricket} 
          buttonText="Explore Cricket"
          href="/cricket"
        />
        <SportsSection 
          title="Football" 
          image={images.football} 
          buttonText="Discover Football"
          href="/football"
        />
      </div>
      <ReviewSection />
      {/* <Footer /> */}
    </div>
  );
}