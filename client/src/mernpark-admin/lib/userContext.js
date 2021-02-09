import Cookies from 'universal-cookie';
import React, { useState, createContext, useEffect } from 'react';
import { axiosInstance } from './index';
import Loading from '../components/laoding'


const cookies = new Cookies();

export const UserContext = createContext();

export const UserProvider = props => {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserFromToken().then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <Loading /> : props.children}
    </UserContext.Provider>
  );
};


export const authUser = async (formData) => {
  let resToken = await axiosInstance.post('/api/user/login', formData);
  let token = resToken.data;
  let error = resToken.data.error;

  if (typeof token !== 'undefined'){
    // For axios to be utilize
    cookies.set('token', token);

    let resUser = await axiosInstance.get('/api/user/me');
    let user = resUser.data;
    
    if (typeof user !== 'undefined') {
      return user;
    }
  } else {
    return error;
  }
}


export const getToken = () => {
  let token = cookies.get('token');

  if (typeof token !== 'undefined'){
    return cookies.get('token')
  } else {
    return false;
  }
}


export const getUserFromToken = async () => {
  let token = cookies.get('token');

  if (typeof token !== 'undefined') {
    let resUser = await axiosInstance.get('/api/user/me');

    console.log(resUser);
    // let user = resUser.data;

    return resUser;
  } else {
    return false;
  }
}

export const getAllUsers = async () => {
  let users = await axiosInstance.get('/api/users/all');

  console.log(users);

  if (typeof users !== 'undefined') { 
    return users.data;
  }
}