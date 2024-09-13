import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md text-black">
      <h3 className="text-lg font-semibold mb-2">Edit Review</h3>
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
        className="bg-white mb-4"
      />
      <div className="mt-4 space-x-2">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Submit Review
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReviewEditor;