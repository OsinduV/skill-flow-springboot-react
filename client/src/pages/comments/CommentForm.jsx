import React, { useState } from "react";
import  axios from '../../utils/axios.js'
import "./CommentForm.css";

const CommentForm = ({ postId, userId, parentId = null, onCommentCreated }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      let response;

      if (parentId) {
        response = await axios.post(`/comments/${parentId}/replies`, {
          content,
          postId,
          userId,
        });
      } 
      else {
        response = await axios.post("/comments", {
          content,
          postId,
          userId,
        });
      }

      onCommentCreated(response.data);
      setContent("");
    } 
    catch (err) {
      setError(err.response?.data?.message || "Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Write your comment..."}
        rows={3}
        required
        disabled={isSubmitting}
      />

      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? "Posting..." : parentId ? "Reply" : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
