import React from 'react'
import CommentSection from './CommentSection'
import { useSelector } from "react-redux";
const PostComment = () => {
    const { currentUser } = useSelector((state) => state.user);
  const postId = 1; // From router normally

  return (
    <div>
      <h2>Post Title</h2>
      <p>Post content...</p>

      <CommentSection postId={postId} currentUserId={currentUser.id} />
    </div>
  );
}

export default PostComment
