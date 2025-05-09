import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

const CommentItem = ({
  comment,
  currentUserId,
  depth = 0,
  onUpdate,
  onDelete,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [likes, setLikes] = useState(comment.numberOfLikes || 0); // Changed to numberOfLikes
  const [isLiked, setIsLiked] = useState(
    comment.likedBy?.includes(currentUserId) || false
  );
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplies, setShowReplies] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.replyCount || 0);

  // Fetch initial like count
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const res = await axios.get(`/api/comments/${comment.id}/like-count`);
        setLikes(res.data);
      } catch (err) {
        console.error("Failed to fetch like count", err);
      }
    };

    fetchLikeCount();
  }, [comment.id]);

  // Fetch reply count if not provided
  useEffect(() => {
    const fetchReplyCount = async () => {
      try {
        const res = await axios.get(`/api/comments/${comment.id}/reply-count`);
        setReplyCount(res.data);
      } 
      catch (err) 
      {
        
        console.error("Failed to fetch reply count", err);
      }
    };

    if (replyCount === 0 && !comment.replyCount) {
      fetchReplyCount();
    }
  }, [comment.id, comment.replyCount, replyCount]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        const res = await axios.delete(`/api/comments/${comment.id}/unlike`, {
          params: { userId: currentUserId },
        });
        setLikes(res.data.numberOfLikes); // Changed to numberOfLikes
        setIsLiked(false);
      } else {
        const res = await axios.post(`/api/comments/${comment.id}/like`, null, {
          params: { userId: currentUserId },
        });
        setLikes(res.data.numberOfLikes); // Changed to numberOfLikes
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/api/comments/${comment.id}`, {
        content: editedContent,
      });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update comment", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/comments/${comment.id}`);
      onDelete(comment.id);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleReplySubmit = (newReply) => {
    setReplies((prev) => [...prev, newReply]);
    setReplyCount((prev) => prev + 1);
    if (depth > 0) {
      onReply(newReply, comment.id);
    }
    setIsReplying(false);
    setShowReplies(true);
  };

  const loadReplies = async () => {
    if (!showReplies && replies.length === 0) {
      try {
        const res = await axios.get(`/api/comments/${comment.id}/replies`);
        setReplies(res.data);
      } catch (err) {
        console.error("Failed to load replies:", err);
      }
    }
    setShowReplies(!showReplies);
  };

  return (
    <div className={`comment-item depth-${depth} ${depth > 0 ? "reply" : ""}`}>
      {isEditing ? (
        <div className="edit-form">
          
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          
          <button onClick={handleUpdate}>Save</button>
          
          <button onClick={() => setIsEditing(false)}>Cancel</button>
          
        </div>
      ) : (
        <>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-meta">
            <div className="like-section">
              <button
                className={`like-button ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
                aria-label={
                  isLiked ? "Unlike this comment" : "Like this comment"
                }
              >
                <span className="like-icon">❤️</span>
                <span className="like-count">{likes}</span>
              </button>
            </div>
            <div className="comment-actions">
              {currentUserId === comment.userId && (
                <>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
              <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? "Cancel" : "Reply"}
              </button>
            </div>
          </div>

          {isReplying && (
            <div className="reply-form">
              <CommentForm
                postId={comment.postId}
                userId={currentUserId}
                parentId={comment.id}
                onCommentCreated={handleReplySubmit}
              />
            </div>
          )}

          {replyCount > 0 && (
            <div className="replies-container">
              <button className="show-replies-btn" onClick={loadReplies}>
                {showReplies ? "Hide replies" : `Show replies (${replyCount})`}
              </button>

              {showReplies &&
                replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    currentUserId={currentUserId}
                    depth={depth + 1}
                    onUpdate={(updatedReply) => {
                      setReplies((prev) =>
                        prev.map((r) =>
                          r.id === updatedReply.id ? updatedReply : r
                        )
                      );
                    }}
                    onDelete={(replyId) => {
                      setReplies((prev) =>
                        prev.filter((r) => r.id !== replyId)
                      );
                      setReplyCount((prev) => prev - 1);
                    }}
                    onReply={(newNestedReply, parentId) => {
                      setReplies((prev) =>
                        prev.map((r) =>
                          r.id === parentId
                            ? {
                                ...r,
                                replies: [...(r.replies || []), newNestedReply],
                              }
                            : r
                        )
                      );
                    }}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
