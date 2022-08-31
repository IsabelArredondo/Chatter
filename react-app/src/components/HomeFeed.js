import { allThoughts } from '../store/thoughts'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './homeFeed.css'

function Feed() {
    const dispatch = useDispatch()
    const history = useHistory()
    const thoughts = useSelector(state => Object.values(state?.thoughts))
    


    useEffect(() => {
        (async () => {
            await dispatch(allThoughts())
        })();
    }, [dispatch]);



    return (

        <>


            {thoughts?.map((thought) => {

             
                return (
                    <div className='Wrapper'>
                    <div className='FeedContainer'>
                        <div className='userInfo'>
                        {thought?.user?.profileImage ? <img className='ProfileImage' src={thought?.user?.profileImage} />
                                :<i className="fa-solid fa-user-crown defaultUserLogo"></i>}
                        <div className='username'> {thought?.user?.username}</div>
                        </div>

                        <div className='description'>{thought?.description}</div>
                        {thought?.img !== null ? 
                        <img className='feedimage' src={thought?.img}/>
                        :null
                        }
                        
                    </div>
                    </div>
                )
            })}
        </>
    )
}


export default Feed