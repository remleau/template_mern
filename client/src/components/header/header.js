import React, { useContext } from 'react';
import './header.scss';

import { UserContext } from './../../components/context/UserContext';

const Header = () =>{

    const [user, setUser] = useContext(UserContext);

    return(
        <div>
            {!user.message ? user.user_name : ""}
        </div>
    );
};

export default Header;
