import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import "./CommentSection.css";

const CommentSection = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        
        const res = await axios.get(`/api/comments/post/${postId}`);
        
        // setComments(res.data);
        setComments(Array.isArray(res.data) ? res.data : []); // Force array

      } catch (err) {
        console.error("Failed to fetch comments", err);
        setComments([]); // Reset on error
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleNewReply = (newReply, parentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newReply]
                : [newReply],
            }
          : comment
      )
    );
  };

  if (loading) return <div>Loading comments...</div>;
  // console.log(comments)

console.log(comments);
  return (
    <div className="comment-section">
     
      <h3>Comments ({comments.length})</h3>
      <CommentForm
        postId={postId}
        userId={currentUserId}
        onCommentCreated={handleNewComment}
      />
      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        setComments={setComments}
        onNewReply={handleNewReply}
      />
    </div>
  );
};

export default CommentSection;
