import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

import { UserContext } from './../../components/context/UserContext';

const Header = () =>{
    
    const {user, isLoggedIn ,setIsLoggedIn} = useContext(UserContext);

    const logout = () => {
        setIsLoggedIn(false)
    }

    return(
        <div>
        { 
            isLoggedIn ?  (
                <header>
                    <div className="logo">
                        <Link to={'/dashboard'}><h1>Mern App</h1></Link>
                    </div>
                    <nav>
                        <Link to={'/dashboard/sub1'} className="cta">Sub 1</Link>
                        <Link to={'/dashboard/sub2'} className="cta">Sub 2</Link>
                        <Link to={'/dashboard/sub3'} className="cta">Sub 3</Link>
                    </nav>
                    {isLoggedIn ? user.user_name : ""}
                    {isLoggedIn ? <a onClick={logout}>Logout</a> : ""}
                </header>
            ) : "" }
        </div>
    );
};

export default Header;
