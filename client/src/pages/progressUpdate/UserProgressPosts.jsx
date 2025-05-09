import { useEffect, useState } from "react";
import axios from "../../utils/axios";
// import CreatePost from "./CreatePost";
import ProgressPostSection from "./ProgressPostSection";
import { useSelector } from "react-redux";

export default function UserProgressPosts() {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = currentUser.id;
        const res = await axios.get(`/progress/user/${userId}`);
        setPosts(res.data);
      
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="w-full h-screen px-4 py-10 overflow-y-scroll">
      {/* <CreatePost /> */}
      
      {posts.map((post) => (
        <ProgressPostSection key={post.id} post={post} />
      ))}
    </div>
  );
}
