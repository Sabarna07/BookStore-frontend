import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FormData from 'form-data'
import { uploadFile } from '../../actions/pdf'
import { getCookie } from '../../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../Preloader'
import LoadingOverlay from 'react-loading-overlay';


const Conatiner = styled.div`
    padding: 100px 20px 0px 20px;
    width: 100%;

    h2{
        text-align: center;
    }
`
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const FormDiv = styled.div`
    width:500px;
    padding: 40px 30px 20px 30px;;
    /* background: #05445E; */
    color: #ffff;
`
const Form = styled.form`
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
        padding: 0 20px;
        outline:none;

        &:focus{
            border-color: #18A558;
            border-bottom-color: #18A558;
        }
    }
    .field{
        margin-bottom: 20px;

        &:nth-child(5){
            margin: auto;
            margin-bottom:10px;
            padding: 10px 13px;
            border-radius:10px;
            display: flex;
        }
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
    label{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        cursor: pointer;
        color: #1F252F;
        font-weight: 600;
        margin: 0 10px;
        background-color: #D4F1F4;
        padding: 13px;
        border-radius: 10px;
    }
`
const UploadDiv = styled.div`
    /* width:450px; */
    padding: 40px 30px 50px 30px;
    /* background: #05445E; */
    color: #ffff;
`
const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* margin: 40px 0px; */
    justify-content: center;
    align-items: center;
    color: #1F252F;

    .preview{
        width: 45%;
        height: 267px;
        margin-top:10px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .uploadFile{
        /* width: 50%; */
        margin: 10px 0;
        background-color: #D4F1F4;
        padding: 9px 10px;
        cursor: pointer;
        border-radius: 10px;

        label{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            cursor: pointer;
            color: #1F252F;
            font-weight: 600;
        }
    }
`

const AdminUploadBooks = () => {

    const {token} = getCookie()

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
        title:'',
        desc:'',
        category:'',
        author:'',
        formData: new FormData(),
        success:false,
        error:'',
        loading:false
    })
    const [preview, setPreview] = useState()
    const [photo, setPhoto] = useState()

    const {title,desc,category,author,error,success, loading,formData} = values

    const handleChange = name => e =>{
        const values = name === 'pdf' ? e.target.files[0] : e.target.value;
        // console.log(name,values)
        formData.set(name,values)
        setValues({...values,[name]:values,error:'',success:false, formData,loading:false})

        if(name === 'photo'){
            setPhoto(e.target.files[0])
            // console.log(name,e.target.files[0])
            formData.set(name,e.target.files[0])
            setValues({...values,formData})
            const file = URL.createObjectURL(e.target.files[0])
            setPreview(file)
        } 
    }

    const uploadPdf = (e) =>{
        e.preventDefault()
        setValues({...values,success:"",error:"",loading:true})
        uploadFile(token,formData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error,success:"",loading:false})
                toast.error(data.error,toastDetails)
            }
            else{
                setValues({...values, error:'',success:data.message,loading:false})
                toast.success(data.message,toastDetails)
            }
        })
    }

    return (
        <>
            {/* {loading && <Preloader/>} */}
            <LoadingOverlay active={loading} spinner={<Preloader/>}>
        <Conatiner>
            <h2>Upload Books</h2>
            <Wrapper>
            <FormDiv>
            <Form onSubmit={uploadPdf}>
                <div className="field">
                    <div className="input-area">
                        <input type="text" placeholder="Title" onChange={handleChange('title')} value={title} />
                    </div>
                </div>
                <div className="field">
                    <div className="input-area">
                        <input type="text" placeholder="Description" onChange={handleChange('desc')} value={desc} />
                    </div>
                </div>
                <div className="field">
                    <div className="input-area">
                        <input type="text" placeholder="Category" onChange={handleChange('category')} value={category} />
                    </div>
                </div>
                <div className="field">
                    <div className="input-area">
                        <input type="text" placeholder="Author" onChange={handleChange('author')} value={author} />
                    </div>
                </div>
                <div className="field">
                    <label>
                        Upload PDF
                        <input type="file" accept='application/pdf' hidden onChange={handleChange('pdf')} name="pdf" />
                    </label>
                    <label>
                        Upload Image
                        <input type="file" accept="image/*" hidden onChange={handleChange('photo')} name="photo" />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </Form>
            </FormDiv>
            <UploadDiv>
                <UploadWrapper>
                    <h3>Image Preview</h3>
                    {preview && 
                        <div className="preview">
                            <img src={preview} alt="" />
                        </div>
                    }
                {/* <div className="uploadFile">
                    <label onSubmit={uploadPdf}>
                        Upload Image
                        <input type="file" accept="image/*" hidden onChange={handleChange('photo')} />
                    </label>
                </div> */}
                </UploadWrapper>
            </UploadDiv>
            </Wrapper>
            <ToastContainer/>
        </Conatiner>
            </LoadingOverlay>
        </>
    )
}

export default AdminUploadBooks
