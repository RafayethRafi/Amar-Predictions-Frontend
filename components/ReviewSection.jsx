export default function ReviewSection() {
  const reviews = [
    { id: 1, text: "Great Predictions!", author: "Sanoar Hossain" },
    { id: 2, text: "Loved the Insights", author: "King Rafi" },
    { id: 3, text: "I keep coming back to this", author: "Kazi Afsar" },
  ];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-300 mb-4">{review.text}</p>
              <p className="font-semibold text-gray-800 dark:text-white">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}