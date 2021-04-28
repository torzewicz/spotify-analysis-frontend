import React, {useCallback, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import DrawerContent from './DrawerContent';
import {closeSidebarAction} from '../../redux/actions/layoutActions';
import {useHistory, useLocation} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';

const SideBar = ({window}) => {
    const classes = useStyles();
    const modalRef = useRef();
    const dispatch = useDispatch();


    const {pathname} = useLocation();
    const history = useHistory();
    const handleDrawerClose = useCallback(() => dispatch(closeSidebarAction()), [dispatch]);

    const handleLogOut = useCallback(() => {
        // dispatch(logout(history));
        handleDrawerClose();
    }, [dispatch, history, handleDrawerClose]);


    const {sidebarOpen} = useSelector(state => state.layout);

    if (modalRef.current && modalRef.current.style) {
        modalRef.current.style.zIndex = 900;
    }
    const drawerContent = useMemo(() => (<DrawerContent
        pathname={pathname}
        handleLogOut={handleLogOut}
    />), [pathname, handleLogOut]);

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <nav>
            <Drawer
                container={container}
                variant={'temporary'}
                onClose={handleDrawerClose}
                open={sidebarOpen}
                ModalProps={{keepMounted: true, ref: modalRef}}
            >
                <div className={classes.toolbar}/>
                {drawerContent}
            </Drawer>
        </nav>
    );
};


const drawerWidth = 240;

const useStyles = makeStyles({
    sideBar: {
        width: drawerWidth,
    },
    toolbar: {
        minHeight: 48
    }
});


export default SideBar;




