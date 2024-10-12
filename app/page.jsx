import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import SportsSection from '@/components/SportsSection'
import ReviewSection from '@/components/ReviewSection'
import Loading from '@/components/Loading'

async function getImages() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

  const endpoints = [
    '/users/main_background_image',
    '/users/cricket_background_image',
    '/users/football_background_image'
  ]

  try {
    const responses = await Promise.all(
      endpoints.map(endpoint => 
        fetch(`${api}${endpoint}`, {
          next: { revalidate: 3600 }, // Revalidate every hour
          headers: {
            'Accept': 'application/json'
          }
        })
      )
    )

    const data = await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          console.error(`Failed to fetch: ${response.url}, Status: ${response.status}`)
          return null
        }
        return response.json()
      })
    )

    return {
      hero: data[0],
      cricket: data[1],
      football: data[2]
    }
  } catch (error) {
    console.error("Error fetching images:", error)
    return {
      hero: null,
      cricket: null,
      football: null
    }
  }
}

export default async function HomePage() {
  const images = await getImages()

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<Loading />}>
        <HeroSection image={images.hero} />
        <div className="flex flex-col md:flex-row">
          <SportsSection 
            title="Cricket" 
            image={images.cricket} 
            buttonText="Explore Cricket Predictions"
            href="/cricket"
          />
          <SportsSection 
            title="Football" 
            image={images.football} 
            buttonText="Explore Football Predictions"
            href="/football"
          />
        </div>
        <ReviewSection />
      </Suspense>
    </div>
  )
}