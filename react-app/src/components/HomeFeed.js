import { allThoughts, deleteThought } from '../store/thoughts'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CreatePosts from '../components/posts/CreatePosts'
import EditPostModal from './posts/EditPostModal'
import CommentModal from './ComentsModal'
import './homeFeed.css'
import NavBar from './NavBar'
import SideBar from './sidebar'

function Feed() {
    const dispatch = useDispatch()
    
    const thought = useSelector(state => (state?.thoughts))
    const thoughts = Object.values(thought).reverse()

    const user = useSelector(state => state?.session?.user)


    useEffect(() => {
        (async () => {
            await dispatch(allThoughts())
        })();
    }, [dispatch]);

    const removePost = (id) => async (e) => {

        e.preventDefault()
        dispatch(deleteThought(id))
    }



    return (

        <>
        
            <div className='postcontainer'>
                <NavBar />
                <div className='Wrapper'>
                    <h1>Home</h1>
                    <div className='createPost'>
                        <CreatePosts />
                    </div>

                    {thoughts?.map((thought) => {
                      console.log(thought?.img)
                        return (


                            <div className='FeedContainer'>



                                <div className='userInfo'>
                                    <Link to={`/posts/user/${thought?.user?.id}`} key={thought?.id} >
                                        {thought?.user?.profileImage ? <img className='ProfileImage' alt="Profile" src={thought?.user?.profileImage} />
                                            : <i className="fa-solid fa-user-secret homefeeddefaultuser"></i>  }
                                    </Link>
                                    <div className='username'> {thought?.user?.username}</div>

                                </div>


                                <div className='description'>{thought?.description}</div>
                                {thought?.img ?
                                
                                    <img className='feedimage' alt="description" src={thought?.img} />
                                    : null
                                }
                            

                               <div className='editanddelete'>
                                <CommentModal thought={thought}/>
                                <span className='postdelete'>
                                    {user?.id === thought?.user?.id && <button className='deleteIconBtn' onClick={removePost(thought?.id)}><i class="fa-solid fa-trash-can fa-xl"></i></button>}
                                </span>
                                <span className='postedit'>
                                    {user?.id === thought?.user?.id && <EditPostModal thought={thought} />}
                                </span>
                                </div>
                            </div>

                        )
                    })}

                </div>
                
                <SideBar />
            </div>
      
        </>
    )
}


export default Feed