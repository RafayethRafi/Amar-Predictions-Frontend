export const getImages = async () => {
  const defaultImage = {
    image: null,
    altText: "Default placeholder"
  };

  try {
    const [hero, cricket, football] = await Promise.all([
      getImage('/users/main_background_image').catch(() => defaultImage),
      getImage('/users/cricket_background_image').catch(() => defaultImage),
      getImage('/users/football_background_image').catch(() => defaultImage)
    ]);

    return { 
      hero: hero || defaultImage, 
      cricket: cricket || defaultImage, 
      football: football || defaultImage 
    };
  } catch (error) {
    console.error("Error in getImages:", error);
    return {
      hero: defaultImage,
      cricket: defaultImage,
      football: defaultImage
    };
  }
};