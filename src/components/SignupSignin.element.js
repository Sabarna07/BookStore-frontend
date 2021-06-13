import styled from 'styled-components'

export const Container = styled.div`
    padding: 100px 20px 30px 20px;
    background-color: #D4F1F4;
    width: 100%;
    height:100vh;
`
export const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`
export const FormDiv = styled.div`
    width:500px;
    padding: 40px 30px 50px 30px;
    background: #05445E;
    color: #ffff;

    a{
        text-decoration:none !important;
        color: #D4F1F4;
        transition: .3s;

        &:hover{
            color: #E5E6E9;
            text-decoration:underline !important; 
        }
    }

    .title{
        text-align:center;
        font-size:25px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .signin-link{
        text-align:center;

    }

`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 40px 0px;

    input{
        height:50px;
        width:100%;
        font-size:18px;
        border-radius: 5px;
        border:1px solid #bfbfbf;
        border-bottom-width: 2px;   
        padding: 0 45px;
        outline:none;

        &:focus{
            border-color: #18A558;
            border-bottom-color: #18A558;
        }
    }

    .field{
        margin-bottom: 20px;

        .input-area{
            position:relative;
        }
        span{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 16px;
            color: #D9E4EC;
            font-size:20px;
        }
    }

    .forgot-pass{
        text-align:left;
        margin-top:4px;
    }

    button{
        height: 43px;
    width: 50%;
    margin: auto;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
    border-bottom-width: 2px;
    padding: 0 45px;
    outline: none;
    color: #1F252F;
    font-weight: 600;
    background-color: #D4F1F4;
    }
`