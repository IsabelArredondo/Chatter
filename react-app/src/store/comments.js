const CREATE = 'comment/createComment'
const LOAD= 'comments/load'
const DELETE = 'posts/deleteComment'
const EDIT = 'comments/editComment'


// ---------------------------------------------action creator-----------------------------------

const loadComments = (payload) => ({
    type: LOAD,
    payload,

});

const create = (payload) => ({
    type: CREATE,
    payload,

})


const deleteComment = (id) => {
    return {
        type: DELETE,
        id,
    };
};

const editComment = (updatedComment) => {
    return {
        type: EDIT,
        updatedComment
    }
}

// --------------------------------------------thunk action creator---------------------------------------

export const editComments = (data, id) => async (dispatch) => {
    const response = await fetch(`/comments/comment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: data.description,
        comment_img: data.comment_img

      }),



    })


    const updatedComment = await response.json();

    return dispatch(editComment(updatedComment));
}


export const getAllComments = () => async (dispatch) => {
    const response = await fetch(`/comments/all`)

    if (response.ok) {

        const comment = await response.json();


        dispatch(loadComments(comment))
        


    }
}

export const createComments = (data, postId) => async (dispatch) => {

    const response = await fetch(`/comments/post/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const newcomments = await response.json();
    dispatch(create(newcomments));
    
    return newcomments
};


export const commentDelete = (id) => async (dispatch) => {
    const response = await fetch(`/comments/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deleteComment(res.commentId));
        return res;
    }
};


// ----------------------------------------reducer----------------------------------------------------


const initialState = {comments: []};

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD:

            newState = {...state, comments:[...action?.payload?.comment]};
             
            action?.payload?.comment?.forEach((comment) => { newState[comment?.id] = comment });
            
            return newState;


        case CREATE:

           newState = {...state, comments:[...state?.comments, action?.payload?.comment]};
           newState[action?.payload.id] = action?.payload?.comment
           return newState;


        
        case DELETE: {
              console.log(state?.comments)
            let newComment = state?.comments?.filter(comment => { return comment?.id !== action?.id})
  
               newState = {...state, comments:[...newComment]}

               return newState;
          }


          case EDIT: {
           

           
            state?.comments?.forEach((comment, i)=>{ 
             
             if(comment?.id === action?.updatedComment?.id)
 
             state?.comments?.splice(i, 1, action?.updatedComment)
             })
     
            newState = {...state, comments:[...state?.comments]}
            newState[action?.updatedComment?.id] = action?.updatedComment
            
            return newState
         }


        default:
            return state;
    }
}

export default commentsReducer
