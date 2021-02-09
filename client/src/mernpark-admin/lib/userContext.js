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
  let promise = await axiosInstance.post('/api/user/login', formData);
  
  if (typeof promise.data !== 'undefined'){
    // For axios to be utilize
    cookies.set('token', promise.data);
    
    let resUser = await axiosInstance.get('/api/user/me');
    if (typeof resUser.data !== 'undefined') {
      return resUser.data;
    }
  } else {
    return promise;
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

    if (typeof resUser.data !== 'undefined') {
      return resUser.data;
    }

    return false;
  }

  return false;
}

export const getAllUsers = async () => {
  let users = await axiosInstance.get('/api/users/all');

  if (typeof users !== 'undefined') { 
    return users.data;
  }
}