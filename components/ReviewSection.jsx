export default function ReviewSection() {
    // This is a placeholder. You might want to fetch real reviews from an API
    const reviews = [
      { id: 1, text: "Great experience!", author: "John Doe" },
      { id: 2, text: "Loved the games!", author: "Jane Smith" },
      { id: 3, text: "Will definitely come back!", author: "Bob Johnson" },
    ];
  
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">`{review.text}`</p>
                <p className="font-semibold">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }