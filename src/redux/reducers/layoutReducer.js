import {
    SIDEBAR_CLOSED,
    SIDEBAR_OPENED,
    SIDEBAR_TOGGLED
} from '../actions/types';


const initialState = {
    sidebarOpen: false
};

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIDEBAR_OPENED:
            return {
                ...state,
                sidebarOpen: true,
            };
        case SIDEBAR_CLOSED:
            return {
                ...state,
                sidebarOpen: false,
            };
        case SIDEBAR_TOGGLED:
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen,
            };
        default:
            return state;
    }
};

export default layoutReducer;
