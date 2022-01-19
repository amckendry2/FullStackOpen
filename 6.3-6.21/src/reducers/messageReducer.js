const initialState = {
    message: null,
    category: null,
    pendingClear: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "setMessage":
            return  action.data
        case "clearMessage":
            return initialState 
        default:
            return state
    }
}

export const setMessage = (msg, cat, ms) => async (dispatch, getState) => { 
    clearTimeout(getState().message.pendingClear)
    dispatch({
        type: "setMessage",
        data:{
            message: msg,
            category: cat,
            pendingClear: setTimeout(() => {
                dispatch({
                    type: "clearMessage"
                })
            }, ms)
        }
    })
}

export default reducer