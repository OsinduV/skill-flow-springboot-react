import React from "react";
import CommentItem from "./CommentItem";


const CommentList = ({ comments, currentUserId, setComments, onNewReply }) => {
  // Ensure `comments` is always an array, even if null/undefined/wrong type
  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="comment-list">
      {safeComments.map((comment) => (
        <div key={comment.id} className="comment-container">
          
          
          <CommentItem
            comment={comment}
            currentUserId={currentUserId}
            onUpdate={(updated) => {
              setComments((prev) =>
                prev.map((c) => (c.id === updated.id ? updated : c))
              );
            }}
            onDelete={(id) => {
              setComments((prev) => prev.filter((c) => c.id !== id));
            }}
            onReply={onNewReply}
          />

          {/* Replies section (already safely checked) */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="replies-container">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  isReply={true}
                  onUpdate={(updated) => {
                    setComments((prev) =>
                      prev.map((c) =>
                        c.id === comment.id
                          ? {
                              ...c,
                              replies: c.replies.map((r) =>
                                r.id === updated.id ? updated : r
                              ),
                            }
                          : c
                      )
                    );
                  }}
                  onDelete={(id) => {
                    setComments((prev) =>
                      prev.map((c) =>
                        c.id === comment.id
                          ? {
                              ...c,
                              replies: c.replies.filter((r) => r.id !== id),
                            }
                          : c
                      )
                    );
                  }}
                  onReply={onNewReply}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
