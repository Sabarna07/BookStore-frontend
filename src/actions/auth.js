import {API} from '../config'
import {Redirect, Router} from 'react-router-dom'
import cookie from 'js-cookie'
const queryString = require('query-string');

export const handleResponse = (response) =>{
    if (response.status === 401) {
        signout(() =>(<Redirect to='/signin'/>));
        //window.location.reload();
      }
}

export const preSignup = (user) =>{
    // console.log(user)
    return fetch(`${API}/pre-signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
};

export const signup = (token) => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

export const signin = (user) =>{
    // console.log(user)
    return fetch(`${API}/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
};


export const signout = (next) =>{
    removeCookie("token");
    removeLocalStorage("user");
    next();
  
    return fetch(`${API}/signout`, {
      method: "GET",
    })
    .then((response) => {
        console.log("signout successfull");
    })
    .catch((err) => console.log(err));
}


//set cookie
export const setCookie = (key,value) =>{
    if(process.browser){
        cookie.set(key,value,{expires:1})
    }
}

//remove cookie
export const removeCookie = (key,value) =>{
    if(process.browser){
        cookie.remove(key,value,{expires:1})
    }
}

//get cookie
export const getCookie = (key,value) =>{
    if(process.browser){
        return cookie.get(key)
    }
}

//set local storage
export const setLocalStorage = (key,value) =>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

//remove local storage
export const removeLocalStorage = (key,value) =>{
    if(process.browser){
        localStorage.removeItem(key)
    }
}

//authenticate 
export const authenticate = (data,next) =>{
    setCookie('token',data.token)
    setLocalStorage('user',data.user)
    next();
}

export const isAuth = () =>{
    if(process.browser){
        const checkedCookie = getCookie('token');
        if(checkedCookie){
            if(localStorage.getItem("user")){
                return JSON.parse(localStorage.getItem("user"))
            }
            else{
                return false;
            }
        }
    }
}