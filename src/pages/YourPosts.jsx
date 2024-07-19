import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import './Home.css';

const YourPosts = () => {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');

  const fetchYourPosts = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/yourposts/"+userID, {
        headers: { authorization: cookies.access_token },
      });
      console.log(resp);
      setPosts(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://insta-post-backend-api.onrender.com/delete-post/${postId}`, {
        headers: { authorization: cookies.access_token },
      });
      fetchYourPosts(); // Refresh posts after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYourPosts();
  }, []);

  return (
    <>
      <h4>YOUR POSTS</h4>
      <div>
        {posts.length > 0 ? (
          <>
            <div>
              {posts.map((item, index) => (
                <div key={index} className="post">
                  <h3>
                    {item.title} - posted by : <span>{item.createdBy}</span>
                  </h3>
                  <img src={item.postImage} height={200} width={200} alt={item.title} />
                  <h3>{item.desc}</h3>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>NO POST, Your Feed is Empty</h3>
          </>
        )}
      </div>
    </>
  );
};

export default YourPosts