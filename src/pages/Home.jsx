import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { Cookies } from 'react-cookie'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [posts, setposts] = useState([])
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');

  const nav = useNavigate()
  const fetchPosts = async()=>{
    try {
      const resp = await axios.get("https://insta-post-backend-api.onrender.com/posts")
      setposts(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (postId) => {
    try {
     const resp = await axios.delete(`https://insta-post-backend-api.onrender.com/delete-post/${postId}`, {
        headers: { authorization: cookies.access_token },
      });
      fetchPosts();
      // if (resp.status === 200){
      //   fetchPosts(); // Refresh posts after deletion
      // }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(()=>{
    fetchPosts()
  },[])

  const handleClick = () =>{
    nav('/createpost')
  }
  const handleYourPosts = () =>{
    nav('/yourposts')
  }
  return (
    <>
    <h4>ALL POSTS</h4>
    <button onClick={handleClick}>Create your Post</button>
    <button onClick={handleYourPosts}>Your Posts</button>
    <div>
      {posts.length > 0 
      ? 
      <>
      <div>
        {posts.map((item,index)=>{
          return(
            <div key={index} className='post'>
              <h3>{item.title} - posted by :  <span>{item.createdBy}</span> </h3>
              <img src={item.postImage} height={200} width={200} alt={item.title} />
              <h3>{item.desc}</h3>
              {item.createdBy === userID 
              && 
              (<button onClick={() => handleDelete(item._id)}>Delete</button>  )} 
            </div>
          )
        })}
      </div>
      </> 
      : 
      <>
      <h3>NO POST , Your Feed is Empty</h3>
      </>
      }
    </div>
    </>
  )
}

export default Home