import React, { useContext } from 'react';
import './footer.scss';

import { UserContext } from './../../components/context/UserContext';

const Footer = () => {
  const [user] = useContext(UserContext);
  return (
    <div>
      {!user.message ? user.user_name : ""}
    </div>
  );
};

export default Footer;