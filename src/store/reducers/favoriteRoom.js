import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    favoriteRoom: null,
    favoriteroomList: [],
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
        case 'SET_FAVORITEROOM_ACTION':
            return setItemAction(state, payload, 'FAVORITEROOM');
        case 'RESET_FAVORITEROOM_ACTION':
            return resetItemAction(state, 'FAVORITEROOM');
        default: return state
    }
}