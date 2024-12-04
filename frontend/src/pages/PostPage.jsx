import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPostById, addComment } from "../utils/apiUtil"; // Import addComment utility
import { toast } from "react-toastify";

function PostPage({ isAuthenticated }) {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id"); // Get the post ID from the URL
  const [data, setData] = useState({}); // State to hold the post data
  const [comment, setComment] = useState(""); // State to hold the new comment

  // Fetch post data when component mounts or when postId changes
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostById(postId); // Fetch post by ID
      if (response.success) {
        setData(response.data.post);
      } else {
        toast.error(response.message); // Show error if fetching fails
      }
    };
    fetchPost();
  }, [postId]);

  // Handle comment input change
  const handleCommentChange = (e) => {
    console.log("Updated comment:", e.target.value); // Log the comment as it updates
    setComment(e.target.value);
  };

  // Handle comment form submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim()) {
      // Check if the comment is not empty
      const response = await addComment({
        userId: data.userId, // Pass the user ID
        postId, // Pass the post ID
        comment: comment, // Pass the comment text
      });

      if (response.success) {
        console.log(response);
        toast.success("Comment added successfully!");
        setComment(""); // Reset the comment input field
        // Add the new comment to the existing comments
        setData((prevData) => ({
          ...prevData,
          comments: [...prevData.comments, response.data.comments],
        }));
      } else {
        toast.error(response.message || "Failed to add comment");
      }
    } else {
      toast.error("Please enter a comment before submitting.");
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg text-gray-600">{data?.title}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={data.createdAt} className="text-gray-500">
                {data.createdAt}
              </time>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                <span className="absolute inset-0" />
                {data.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm text-gray-600">
                {data.content}
              </p>
            </div>
          </article>
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-8">
        <strong className="text-lg">Comments</strong>
        <div className="space-y-4 mt-4">
          {isAuthenticated &&
            data?.comments?.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <p className="text-gray-800">{comment.comment}</p>
                <p className="text-sm text-gray-500">{comment.createdAt}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Comment form */}
      <div className="mt-8">
        <strong className="text-lg">
          {isAuthenticated ? "Add Comment" : "Login to Add Comments"}
        </strong>
        {isAuthenticated && (
          <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
            <textarea
              id="comment"
              name="comment"
              value={comment} // Bind the value to the comment state
              onChange={handleCommentChange} // Update state when input changes
              placeholder="Add your comment here..."
              rows="4"
              className="block w-full rounded-md border border-gray-300 p-4 text-base text-gray-900 focus:ring-indigo-600 focus:border-indigo-600"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Post Comment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostPage;
