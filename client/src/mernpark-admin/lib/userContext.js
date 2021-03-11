import Cookies from 'universal-cookie';
import React, { useState, createContext, useEffect } from 'react';
import { axiosInstance } from './index';

import Loading from '../components/laoding';


const cookies = new Cookies();

export const UserContext = createContext();

export const UserProvider = props => {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    getUserFromToken().then((user) => {
      if(!user.error) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false)
      }
    });
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {(loading) ? <Loading /> : props.children}
    </UserContext.Provider>
  );
};


export const authUser = async (formData) => {
  let promise = await axiosInstance.post('/api/user/login', formData);

  if (typeof promise?.data !== 'undefined'){
    // For axios to be utilize
    cookies.set('token', promise.data);
    
    let resUser = await axiosInstance.get('/api/user/me');
    if (typeof resUser?.data !== 'undefined') {
      return resUser.data;
    }
  } else {
    cookies.remove('token');

    return {
      error: 'No token'
    };
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

    if (typeof resUser?.data?.user !== 'undefined') {
      return resUser.error;
    } else if (typeof resUser?.data !== 'undefined'){
      return resUser.data;
    }
  }

  return false;
}

export const getAllUsers = async () => {
  let users = await axiosInstance.get('/api/users/all');

  if (typeof users !== 'undefined') { 
    return users.data;
  }
}

export const addUser = async (formData) => {
  let promise = await axiosInstance.post('/api/user/create', formData);

  if (typeof promise.data !== 'undefined') {
    return promise.data;
  } 

  return {
    error: 'error'
  }
}

export const deleteUser = async (id) => {
  let promise = await axiosInstance.delete('/api/user/delete', {
    headers: {
      user_id: id || false
    }
  });

  if (typeof promise.data !== 'undefined') {
    return promise.data;
  } 
}

export const getUserProfile = async (id) => {
  let promise = await axiosInstance.get('/api/user/profile', {
    headers: {
      user_id: id
    }
  });

  if (typeof promise !== 'undefined') {
    return promise.data;
  } else {
    return promise.error;
  }
}