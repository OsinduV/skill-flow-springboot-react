import { useEffect, useState } from "react";
import axios from "../../utils/axios";
// import CreatePost from "./CreatePost";
import ProgressPostSection from "./ProgressPostSection";
import { useSelector } from "react-redux";

export default function AllProgressPosts() {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = currentUser.id;
        const res = await axios.get(`/progress`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll py-10 px-4">
      {/* <CreatePost /> */}
      {posts.map((post) => (
        <ProgressPostSection key={post.id} post={post} />
      ))}
    </div>
  );
}
