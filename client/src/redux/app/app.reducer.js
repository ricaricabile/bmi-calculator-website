const INITIAL_STATE = {
    weight: 5,
    result: 0,
    incm: 0,
    left: 1,
    right: 1,
    resultKegs: 0
};
const appReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_WEIGHT': return {...state, weight: action.payload};
        case 'SET_HEIGHT': return {...state, incm: action.payload};
        case 'SET_LEFT': return {...state, left: action.payload};
        case 'SET_RIGHT': return {...state, right: action.payload};
        case 'SET_RESULT_POUNDS': return {...state, result: action.payload};
        case 'SET_RESULT_KGS': return {...state, resultKegs: action.payload};
        default: 
            return state;
    }
}
export default appReducer;
