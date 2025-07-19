import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  id: string;
  comment: string;
  rating?: number;
  user?: string;
}

const ReviewSection = ({ propertyId }: { propertyId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `/api/properties/${propertyId}/reviews`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-2">
            <p className="text-gray-800">{review.comment}</p>
            {review.rating && (
              <p className="text-sm text-yellow-600">
                Rating: {review.rating}⭐
              </p>
            )}
            {review.user && (
              <p className="text-sm text-gray-500">By: {review.user}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
