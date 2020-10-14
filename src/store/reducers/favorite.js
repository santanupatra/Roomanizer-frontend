import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    favorite: null,
    favoriteList: [],
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
        case 'SET_FAVORITE_ACTION':
            return setItemAction(state, payload, 'FAVORITE');
        case 'RESET_FAVORITE_ACTION':
            return resetItemAction(state, 'FAVORITE');
        default: return state
    }
}