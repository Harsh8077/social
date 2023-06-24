import {useState,useEffect,useContext} from 'react'
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext"

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
      fetchPosts();
  },username)

  const fetchPosts = async () => {
        const response = username
            ? await axios.get('/api/posts/profile/'+username)
            : await axios.get('/api/posts/timeline/'+user._id);
        setPosts(response.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
};

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}