import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    agentt: null,
    agenttList: [],
    action: {
        type: null,
        isSuccess: false,
        data: null
    },
    isLoading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
   // console.log("Agentt",payload)
    switch (type) {
        case 'SET_AGENTT_ACTION':
            return setItemAction(state, payload, 'AGENTT');
        case 'RESET_AGENTT_ACTION':
            return resetItemAction(state, 'AGENTT');
        default: return state
    }
}