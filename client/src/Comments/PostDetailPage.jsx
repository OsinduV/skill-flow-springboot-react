import React from "react";
import CommentSection from "./CommentSection";

const PostDetailPage = () => {
  const postId = 1; // From router normally
  const currentUserId = 1; // Assume logged-in user ID

  return (
    <div className="post-detail">
      <h2>Post Title</h2>
      <p>Post content...</p>

      <CommentSection postId={postId} currentUserId={currentUserId} />
    </div>
  );
};

export default PostDetailPage;
