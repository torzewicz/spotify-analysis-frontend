import React from 'react';
import List from '@material-ui/core/List';
import NavigationLink from './NavigationLink';

const NavigationList = ({menuItems}) => (
    <List>
        {menuItems
            .filter(({visible}) => visible === true)
            .map((item, index) =>
                <NavigationLink {...item}
                                key={index}
                                children={false}
                />
            )
        }
    </List>
);

export default React.memo(NavigationList);
