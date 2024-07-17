import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [posts, setposts] = useState([])
  const nav = useNavigate()
  const fetchPosts = async()=>{
    try {
      const resp = await axios.get("https://insta-post-backend-api.onrender.com/posts")
      setposts(resp.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPosts()
  },[])
  const handleClick = () =>{
    nav('/createpost')
  }
  return (
    <>
    <h4>ALL POSTS</h4>
    <button onClick={handleClick}>Create your Post</button>
    <div>
      {posts.length > 0 
      ? 
      <>
      <div>
        {posts.map((item,index)=>{
          return(
            <div key={index}>
              <h3>{item.title} - posted by :  <span>{item.createdBy}</span> </h3>
              <img src={item.postImage} height={200} width={200} alt={item.title} />
              <h3>{item.desc}</h3>
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