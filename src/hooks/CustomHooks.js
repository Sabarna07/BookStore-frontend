import React from 'react'
import {useLocation} from 'react-router-dom'

export const useQuery = () =>{
    // console.log(useLocation().search);
    return new URLSearchParams(useLocation().search);
}