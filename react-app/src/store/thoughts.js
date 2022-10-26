const LOAD = 'thoughts/load';
const CREATE = 'thoughts/create'
const DELETE = 'thoughts/delete'
const EDIT = 'thoughts/edit'

// ---------------------------------------------action creator-----------------------------------

const getThoughts = (payload) => {
    return{
     type: LOAD,
     payload
    }
   };

// const userThoughts = (payload) => {
//     return{
//      type: LOAD,
//      payload
//     }
//    };


const createThoughts = (payload) =>{
    return{
      type: CREATE,
      payload
    }
 }

const deleteThoughts = (id) => {
    return {
        type: DELETE,
        id,
    };
};

const editThoughts = (updatedThought) => {
    return {
        type: EDIT,
        updatedThought
    }
}

// --------------------------------------------thunk action creator---------------------------------------

export const allThoughts = () => async(dispatch) => {
    const response = await fetch('/posts/all', {
        headers: {}
      });


    if (response.ok) {

    const post = await response.json()

    dispatch(getThoughts(post))
    
    return post

    
    }
}

// export const userThought = (id) => async(dispatch) => {
//     const response = await fetch(`/posts/${id}`, {
//         headers: {}
//       });


//     if (response.ok) {

//     const post = await response.json()

//     dispatch(userThoughts(post))
    
//     return post

    
//     }
// }

export const createThought = (formData) => async (dispatch) => {

    const response = await fetch('/posts/post', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
    });

    if (response.ok) {
    const newThought = await response.json();
    dispatch(createThoughts(newThought));
    // return newThought
    } 
    
};


export const deleteThought = (id) => async (dispatch) => {
    const response = await fetch(`/posts/post/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deleteThoughts(id));
        return res;
    }
};

export const editThought = (data, id) => async (dispatch) => {
    const response = await fetch(`/posts/post/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: data.description,
        img: data.img
      }),
    })

    if (response.ok) {
        const updatedThought = await response.json();
        dispatch(editThoughts(updatedThought));
        return updatedThought
    }

}
// ----------------------------------------reducer----------------------------------------------------
    const initialState = {thoughts: []};

    const thoughtsReducer = (state = initialState, action) => {
        let newState;
        switch (action?.type) {
    
            case LOAD:
                
                newState = {};
                
                // console.log('ACTION.PAYLOAD', action?.payload?.posts?.forEach((thought) => { newState[thought?.id] = thought }))
                action?.payload?.posts?.forEach((thought) => { newState[thought?.id] = thought })
                
                
                // console.log('NEW STATE BACK', newState)
                return {...newState}


            case CREATE:

                newState = {...state}

                newState[action?.payload?.id] = action?.payload

                return newState;
                
            case DELETE:

                newState = {...state}
                delete newState[action?.id]
    
                return newState;

            case EDIT:

                newState = {};
                
                
                action?.updatedThought?.posts.forEach((posts) => { newState[posts?.id] = posts });

                return {...newState}
                  
            default:
                return state;
        }
    }
    
    export default thoughtsReducer