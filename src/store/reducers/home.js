import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    home: null,
    action: {
        type: null,
        isSuccess: false,
        data: null
    },
    isLoading: false
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'SET_HOME_ACTION' : return setItemAction(state, payload,'HOME');
        case 'RESET_HOME_ACTION' : return resetItemAction(state,'HOME');
        default: return state
    }
}