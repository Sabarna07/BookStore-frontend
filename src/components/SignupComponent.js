import React,{useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {Container,Wrapper,FormDiv,Form} from './SignupSignin.element'
import { preSignup } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {

    const toastDetails = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,    
    }

    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        success:'',
        error:'',
        message:'',
        loading:''
    })

    const {name,email,password,success,error,loading,message} = values

    const handleChange = name => e =>{
        setValues({...values, [name] : e.target.value, error:''})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setValues({...values, error:false, loading:true})
        const user = {name,email,password}
        preSignup(user).then((data)=>{
            if(data.error){
                toast.error(data.error,toastDetails)
                setValues({...values,loading:false,error:data.error})
            }
            else{
                toast.success(data.message,toastDetails)
                setValues({...values, loading:false, success:data.message})
            }
        })
    }

    return (
       <Container>
           <Wrapper>
               <FormDiv>
                   <div className="title">Signup Form</div>
                   <Form onSubmit={handleSubmit}>
                       <div className="field name">
                            <div className="input-area">
                                <input type="text" placeholder="Name" required value={name} onChange={handleChange('name')} />
                                <span><FaIcons.FaUser/></span>
                            </div>
                       </div>
                       <div className="field email">
                            <div className="input-area">
                                <input type="email" placeholder="Email" value={email} onChange={handleChange('email')} required  />
                                <span><IoIcons.IoMail/></span>
                            </div>
                       </div>
                       <div className="field password">
                            <div className="input-area">
                                <input type="password" placeholder="Password" value={password} onChange={handleChange('password')} required/>
                                <span><FaIcons.FaUserLock/></span>
                            </div>
                            {/* <div className="forgot-pass">
                                <Link to='/forgot/password'>Forgot Password ?</Link>
                            </div> */}
                       </div>
                       <button type="submit" value="signup">Submit</button>
                   </Form>
                   <div className="signin-link">Already have an account? <Link to='/signin'>Signin</Link></div>
                   <ToastContainer/>
               </FormDiv>
           </Wrapper>
       </Container>
    )
}

export default SignupComponent
