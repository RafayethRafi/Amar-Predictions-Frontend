import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const ReviewEditor = ({ initialValue, onSubmit, onCancel }) => {
  const [content, setContent] = useState(initialValue || "");

  useEffect(() => {
    console.log("ReviewEditor mounted");
    return () => console.log("ReviewEditor unmounted");
  }, []);

  const handleSubmit = () => {
    console.log("Submitting review:", content);
    onSubmit(content);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Review</CardTitle>
      </CardHeader>
      <CardContent>
        <QuillNoSSRWrapper
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          className="bg-background mb-4"
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          onClick={handleSubmit}
          variant="default"
        >
          Submit Review
        </Button>
        <Button
          onClick={onCancel}
          variant="secondary"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewEditor;