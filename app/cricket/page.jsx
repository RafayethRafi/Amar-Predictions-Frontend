'use client';

import React, { useState, useEffect, useCallback } from "react";
import CricketCard from "@/components/CricketCard";
import ReviewEditor from "@/components/ReviewEditor";
import useAuth from "@/lib/hooks/useAuth";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function Cricket() {
  const { user, token, isLoading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [cricketData, setCricketData] = useState([]);
  const [showReviewId, setShowReviewId] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!token) {
      console.log('Token not available, skipping fetch');
      return;
    }

    try {
      const response = await fetch(`${api}/users/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      console.log('Fetched reviews:', data);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoading && token) {
      fetchReviews();
      setCricketData([
        { id: 1, title: "IPL 2024", description: "Indian Premier League 2024 season preview" },
        { id: 2, title: "T20 World Cup", description: "Upcoming T20 World Cup analysis" },
        { id: 3, title: "Test Championship", description: "ICC World Test Championship final predictions" },
        { id: 4, title: "Ashes Series", description: "England vs Australia Ashes series breakdown" },
        { id: 5, title: "ODI Rankings", description: "Latest ODI team and player rankings" },
      ]);
    }
  }, [isLoading, token, fetchReviews]);

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleReviewUpdate = async (title, content) => {
    if (!token) {
      console.log('Token not available, cannot update review');
      return;
    }

    const matchId = `${title}_${getCurrentDate()}`;

    try {
      const response = await fetch(`${api}/admin/post_review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          match_id: matchId,
          content: content 
        })
      });

      if (!response.ok) throw new Error('Failed to update review');
      
      await fetchReviews();
      setEditingReviewId(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditingReviewId(id);
    setShowReviewId(null);
  };

  const handleShowReviewClick = (id) => {
    setShowReviewId(id === showReviewId ? null : id);
    setEditingReviewId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Cricket Insights</h1>
      {reviews.length === 0 && <p>No reviews available</p>}
      <div className="space-y-6">
        {cricketData.map((item) => {
          const matchId = `${item.title}_${getCurrentDate()}`;
          const review = reviews.find(r => r.match_id === matchId);
          return (
            <div key={item.id} className="mb-6">
              <CricketCard
                id={item.id}
                title={item.title}
                description={item.description}
                review={review ? review.content : ""}
                isAdmin={user?.isAdmin}
                onEditClick={() => handleEditClick(item.id)}
                onShowReviewClick={() => handleShowReviewClick(item.id)}
                isEditing={editingReviewId === item.id}
                isShowingReview={showReviewId === item.id}
              />
              {editingReviewId === item.id && (
                <div className="mt-4">
                  <ReviewEditor
                    initialValue={review ? review.content : ""}
                    onSubmit={(content) => handleReviewUpdate(item.title, content)}
                    onCancel={() => setEditingReviewId(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}