import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function CricketCard({ review, isAdmin, onEditClick, onDeleteClick, onShowReview }) {
  const showScore = review.score1 !== 0 || review.score2 !== 0 ;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-700 dark:to-purple-800">
        <CardTitle className="text-2xl text-center">
          <span>{review.team1} vs {review.team2}</span>
        </CardTitle>

        <div className='flex justify-between items-center mt-2'>
          <div className='text-xl font-medium flex-grow text-center'>{review.match_type}</div>
          {isAdmin && (
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => onEditClick(review.id)} className="text-white hover:text-blue-200">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDeleteClick(review.id)} className="text-white hover:text-red-200">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col">
        {showScore && (
          <div className="flex justify-between mb-4 text-center">
            <div className="flex-1">
              <p className="text-3xl font-bold">{review.score1}</p>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold">{review.score2}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onShowReview(review.id)} variant="outline" className="w-full">
          Show Insight
        </Button>
      </CardFooter>
    </Card>
  );
}