import { allThoughts, deleteThought } from '../store/thoughts'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreatePosts from '../components/posts/CreatePosts'
import EditPostModal from './posts/EditPostModal'
import './homeFeed.css'
import NavBar from './NavBar'

function Feed() {
    const dispatch = useDispatch()
    const thoughts = useSelector(state => Object.values(state?.thoughts).reverse())

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
        <div className='Wrapper'>
                <div className='createPost'>
                 <CreatePosts />
                </div>

            {thoughts?.map((thought) => {

             
                return (

                    
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
                        

                        <div>
                             {user?.id === thought?.user?.id && <button className='deleteIconBtn'onClick={removePost(thought?.id)}><i class="fa-solid fa-trash-can"></i></button>}
                        </div>
                        <div>
                             {user?.id === thought?.user?.id && <EditPostModal thought={thought}/>}
                        </div>
                    </div>
                    
                )
            })}

            </div>
            <NavBar />
            </div>
        </>
    )
}


export default Feed