const LOAD = 'thoughts/load';






// ---------------------------------------------action creator-----------------------------------

const getThoughts = (payload) => {
    return{
     type: LOAD,
     payload
    }
   };


// --------------------------------------------thunk action creator---------------------------------------

export const allThoughts = () => async(dispatch) => {
    const response = await fetch('/posts/all');


    if (response.ok) {

    let post = await response.json()
    dispatch(getThoughts(post?.posts))
    
    }
}


    const initialState = {thoughts: []};

    const thoughtsReducer = (state = initialState, action) => {
        let newState;
        switch (action?.type) {
    
            case LOAD:
                
                newState = {...state, thoughts:[...action?.payload]};
                
                action?.payload?.forEach((posts) => { newState[posts?.id] = posts });
                
                return newState
    
            default:
                return state;
        }
    }
    
    export default thoughtsReducer