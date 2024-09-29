import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {isShowingReview && (
          <div className="mb-4 bg-muted p-4 rounded">
            <h3 className="font-semibold mb-2">Review:</h3>
            {review ? (
              <div dangerouslySetInnerHTML={{ __html: review }} />
            ) : (
              <p>No review available.</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button
          onClick={onShowReviewClick}
          variant="outline"
        >
          {isShowingReview ? "Hide Review" : "Show Review"}
        </Button>
        {isAdmin && !isEditing && (
          <Button
            onClick={onEditClick}
            variant="default"
          >
            Edit Review
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CricketCard;