// import { Carousel } from "flowbite-react";
// import React from "react";
// import Post from "../post/PostSection";
// import CreatePost from "./CreatePost";

// export default function HomePost() {
//   return (
//     <div className="h-screen w-full overflow-y-scroll py-10 px-4">
//       {/* Create Post Section */}
//       <CreatePost />

//       {/* Posts */}

//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Post from "../post/PostSection";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

export default function HomePost() {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const fetchPosts = async () => {
    try {
      const userId = currentUser.id;
      const res = await axios.get(`/skill-posts/user/${userId}`); // Or use: /skill-posts/all if available
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll py-10 px-4">
      <CreatePost />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

