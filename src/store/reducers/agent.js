import {setItemAction,resetItemAction} from '../../shared/commonUpdateState';
const initialState = {
    agent: null,
    agentList: [],
    action: {
        type: null,
        isSuccess: false,
        data: null
    },
    isLoading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(payload)
    switch (type) {
        case 'SET_AGENT_ACTION':
            return setItemAction(state, payload, 'AGENT');
        case 'RESET_AGENT_ACTION':
            return resetItemAction(state, 'AGENT');
        default: return state
    }
}