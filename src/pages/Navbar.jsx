import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import { useGetUserImage, useGetUserName } from './customHook'

const Navbar = () => {

  const [cookie,setCookie]= useCookies(["access_token"])

  const name = useGetUserName()
  const image = useGetUserImage()
  // console.log(name);

  const nav = useNavigate()

  const handleLogout = () =>{
    setCookie("access_token","")
    window.localStorage.clear()
    nav('/login')
  }

  return (
    <>
    <nav>
        <ul>
            {/* <li><Link to='/'>Home</Link></li>
            <li><Link to='/createpost'>Create Post</Link></li> */}
            {/* <li><Link to='/login'>Login</Link></li> */}
            {cookie.access_token
             ?
            <>
            <li>
            <Link to='/'>
            <img src={image} height={50} width={50} alt={name} />
            <span>{name} </span>
            </Link>
            </li>
            <li>
            <button onClick={handleLogout}>Logout</button>
            </li>
            {/* <li>
              <button onClick={() => nav('/yourposts')}>Your Posts</button>
            </li> */}
            </>
            :
            <>
            {/* <li><Link to='/login'>Login</Link></li> */}
            </>}
        </ul>
    </nav>
    </>
  )
}

export default Navbar