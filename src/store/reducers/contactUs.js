import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    contactUs: null,
    contactUsList: [],
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
        case 'SET_CONTACTUS_ACTION' : return setItemAction(state, payload,'CONTACTUS');
        case 'RESET_CONTACTUS_ACTION' : return resetItemAction(state,'CONTACTUS');
        default: return state
    }
}