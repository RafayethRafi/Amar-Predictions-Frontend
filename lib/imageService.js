const getImage = async (endpoint) => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const url = `${api}${endpoint}`;
    console.log(`Attempting to fetch image from: ${url}`);
    
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        console.log(`Successfully fetched image from ${url}`);
        return data;
      } else {
        console.error(`Failed to fetch image from ${url}. Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching image from ${url}:`, error.message);
      return null;
    }
  };
  
  export const getImages = async () => {
    const [hero, cricket, football] = await Promise.all([
      getImage('/users/main_background_image'),
      getImage('/users/cricket_background_image'),
      getImage('/users/football_background_image')
    ]);
  
    return { hero, cricket, football };
  };