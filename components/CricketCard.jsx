import React from 'react';

const CricketCard = ({ 
  id, 
  title, 
  description, 
  review, 
  isAdmin, 
  onEditClick, 
  onShowReviewClick, 
  isEditing, 
  isShowingReview 
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full text-black">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {isShowingReview && (
        <div className="mb-4 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Review:</h3>
          {review ? (
            <div dangerouslySetInnerHTML={{ __html: review }} />
          ) : (
            <p>No review available.</p>
          )}
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <button
          onClick={onShowReviewClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isShowingReview ? "Hide Review" : "Show Review"}
        </button>
        {isAdmin && !isEditing && (
          <button
            onClick={onEditClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Edit Review
          </button>
        )}
      </div>
    </div>
  );
};

export default CricketCard;