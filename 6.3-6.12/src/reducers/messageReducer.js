const reducer = (state = null, action) => {
    switch(action.type){
        case "setMessage":
            return action.data
        case "clearMessage":
            if(state && state.message === action.message)
                return null 
            return state
        default:
            return state
    }
}

export const setMessage = (msg, cat) => ({ 
    type: "setMessage", 
    data: {
        message: msg,
        category: cat
    } 
})
export const clearMessage = (msg) => ({ 
    type: "clearMessage", 
    message: msg,
})

export default reducer