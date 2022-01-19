const reducer = (state = '', action) => {
    switch(action.type){
        case "setFilter":
            return action.data
        default:
            return state
    }
}

export const setFilter = data => ({type: "setFilter", data: data})

export default reducer