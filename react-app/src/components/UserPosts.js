import { allThoughts, deleteThought } from '../store/thoughts'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {  useParams } from "react-router-dom";
import EditPostModal from './posts/EditPostModal'
import CommentModal from './ComentsModal';
import './homeFeed.css'
import NavBar from './NavBar'
import './UserPosts.css'
import SideBar from './sidebar';

function UserPosts() {
    const dispatch = useDispatch()
    const thoughts = useSelector(state => Object.values(state?.thoughts).reverse())
    const [user, setUser] = useState({});


    const users = useSelector(state => state?.session?.user)

       const { userid } = useParams()
       




    useEffect(() => {
        (async () => {
            await dispatch(allThoughts())
        })();
    }, [dispatch]);

    useEffect(() => {
        if (!userid) {
          return;
        }
        (async () => {
          const response = await fetch(`/api/users/${userid}`);
          const user = await response.json();
          setUser(user);
        })();
      }, [userid]);


    


    const removePost = (id) => async (e) => {

        e.preventDefault()
        dispatch(deleteThought(id))
    }

  
   


    return (

        <>
        <div className='postcontainer'>
         <NavBar />   
        <div className='Wrapper'>
        
                <div className='UserPostHeader'>
                <img className='HeaderImage' alt="Profile" src='https://wallpaperaccess.com/full/529618.jpg' />

                
                        
                        {user?.profileImage ? <img className='UserProfileImage' alt="Profile" src={user?.profileImage} />
                                :<i className="fa-solid fa-user-crown UserLogo"></i>}
                        
                        <div className='Userusername'>
                        <div className='userpost'>{user?.username}</div>
                        <div className='attuserpost'>@{user?.username}</div>
                        <div className='aboutme'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
                         </div>
                        
                

                 
                </div>

            {thoughts?.map((thought) => {
                  
                return (
                   <div>

                    
                    {thought?.user?.id === parseInt(userid)  ?

    


                    <div className='FeedContainer'>


                       
                        <div className='userInfo'>
                        
                        {thought?.user?.profileImage ? <img className='ProfileImage' alt="Profile" src={thought?.user?.profileImage} />
                                :<i className="fa-solid fa-user-crown UserLogo"></i>}
                        
                        <div className='username'> {thought?.user?.username}</div>
                         
                        </div>
                        

                        <div className='description'>{thought?.description}</div>
                        {thought?.img  ? 
                        <img className='feedimage' alt="description" src={thought?.img}/>
                        :null
                        }
                        
                        <div className='editanddelete'>
                        <CommentModal thought={thought}/>
                        <span>
                             {users?.id === thought?.user?.id && <button className='deleteIconBtn'onClick={removePost(thought?.id)}><i className="fa-solid fa-trash-can fa-xl"></i></button>}
                        </span>
                        <span>
                             {users?.id === thought?.user?.id && <EditPostModal thought={thought}/>}
                        </span>
                        </div>


                         
                    </div>

                    : null}
                    
                    </div>
                )
                
            })}

            </div>
           <SideBar />
            </div>

        </>
    )
}




export default UserPosts