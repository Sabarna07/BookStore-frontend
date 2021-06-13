import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import Layout from '../components/Layout'
import jwt from 'jsonwebtoken'
import { signup } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    padding: 100px 30px 30px 30px;

    .title{
        text-align:center;
        margin-bottom:20px;
    }
    .button{
        display: flex;
        justify-content: center;
        align-items: center;

        button{
            padding: 10px 20px;
            color:#efefef;
            background: #189AB4;
            font-size: 20px;
            outline: none;
            border: none;
            border-radius: 10px;
            transition: 0.3s;

            &:hover{
                background-color: #05445E;
            }
        }
    }
    .heading{
        text-align:center;
        background-color: #32CD30;
        padding: 10px 30px;
        border-radius: 10px;

        h1{
            color: #CADEDF;
        }
    }
`


const AccountActivation = () => {

    const toastDetails = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,    
    }


const {tokenId} = useParams();
// console.log(token)

const [values,setValues] = useState({
    name:'',
    token:'',
    error:'',
    loading:false,
    success:false,
    message:'',
    showButton:true
})

const {name,token,error,loading,success,message,showButton} = values

useEffect(()=>{
    // const tokenId = useParams();
    if(tokenId){
        const {name} = jwt.decode(tokenId);
        setValues({...values,name,token:tokenId})
    }
},[])

const handleActivate = (e) =>{
    e.preventDefault()
    signup({token}).then((data)=>{
        if(data.error){
            toast.error(data.error,toastDetails)
            setValues({...values, error:data.error, loading:false, showButton:false})
        }
        else{
            toast.success(data.message)
            setValues({...values, error:false, showButton:false, success:true})
        }
    })
}



    return (
        <Layout>
            <Container>
                <div className="title">
                    <h1>Hey {name}, ready to activate your account ?</h1>
                </div>
                <div className="button">
                    {showButton && <button onClick={handleActivate}>Acctivate Account</button>}
                </div>
                {success && 
                    <div className="heading"><h1>You have successfully activate your account ! please signin</h1></div>
                } 
                <ToastContainer/>
            </Container>
        </Layout>
    )
}

export default AccountActivation
