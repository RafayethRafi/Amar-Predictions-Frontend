"use client";

import { useState, useEffect } from 'react';
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import HeroSection from '@/components/HeroSection';
import SportsSection from '@/components/SportsSection';
import ReviewSection from '@/components/ReviewSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(null);
  const [cricketImage, setCricketImage] = useState(null);
  const [footballImage, setFootballImage] = useState(null);
  const [error, setError] = useState(null);
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const [heroRes, cricketRes, footballRes] = await Promise.all([
          fetch(`${api}/users/main_background_image`, { method: 'GET', headers }),
          fetch(`${api}/users/cricket_background_image`, { method: 'GET', headers }),
          fetch(`${api}/users/football_background_image`, { method: 'GET', headers })
        ]);

        console.log('Hero Response:', heroRes);

        console.log('Hero Response:', heroRes);
        console.log('Cricket Response:', cricketRes);
        console.log('Football Response:', footballRes);

        if (heroRes.ok && cricketRes.ok && footballRes.ok) {
          const [heroData, cricketData, footballData] = await Promise.all([
            heroRes.json(),
            cricketRes.json(),
            footballRes.json()
          ]);

          setHeroImage(heroData);
          setCricketImage(cricketData);
          setFootballImage(footballData);
        } else {
          throw new Error('One or more image fetches failed');
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setError('Failed to load images. Please try again later.');
      }
    };

    if (token) {
      fetchImages();
    }
  }, [token, api]);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection image={heroImage} />
      <div className="flex flex-col md:flex-row">
        <SportsSection 
          title="Cricket" 
          image={cricketImage} 
          buttonText="Explore Cricket"
        />
        <SportsSection 
          title="Football" 
          image={footballImage} 
          buttonText="Discover Football"
        />
      </div>
      <ReviewSection />
      <Footer />
    </div>
  );
}