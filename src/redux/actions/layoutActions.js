import {
    SIDEBAR_OPENED,
    SIDEBAR_CLOSED,
    SIDEBAR_TOGGLED
} from './types';

export const toggleSidebarAction = () => ({type: SIDEBAR_TOGGLED});
export const openSidebarAction = () => ({type: SIDEBAR_OPENED});
export const closeSidebarAction = () => ({type: SIDEBAR_CLOSED});
