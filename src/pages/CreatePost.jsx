import React, { useState } from 'react'
import { useGetUserName } from './customHook'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const CreatePost = () => {

  const name = useGetUserName()

  const nav = useNavigate()

  const [title, settitle] = useState("")
  const [postImage, setpostImage] = useState("")
  const [desc, setdesc] = useState("")
  const [createdBy, setcreatedBy] = useState(name)

  const [cookie,setCookie]= useCookies(["access_token"])


  const handleCreate = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://insta-post-backend-api.onrender.com/create-post",
        {title,postImage,desc,createdBy},
        {headers :{authorization : cookie.access_token}}
      )
      // console.log(response);
      alert("post created successfully")
      nav('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <h1>Create your Post</h1>
    <form onSubmit={handleCreate}>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          id="title"
          placeholder="Enter your Post Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="img">Post Image in (URL) : </label>
        <input
          type="text"
          id="img"
          placeholder="Enter your Post Image in URL"
          value={postImage}
          onChange={(e) => setpostImage(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="desc">Description : </label>
        <input
          type="text"
          id="desc"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          required
        />
        <br /><br />
        <button>Create Post</button>
      </form>
    </>
  )
}

export default CreatePost