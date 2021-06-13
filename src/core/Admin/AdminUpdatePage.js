import React,{useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Layout from '../../components/Layout'
import styled from 'styled-components'
import { Button } from '../../components/Home/elements/Home.element'
import { getFileById, updatePdf } from '../../actions/pdf'
import { getCookie} from '../../actions/auth'
import { API } from '../../config'
import FormData from 'form-data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateContainer = styled.div`
    padding: 102px 40px 30px 39px;
    position: relative;

    .title{
        text-align: center;
        font-size: 38px;
    }
`
const UpdateWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 20px 0px;
`
const ImageDiv = styled.div`
    border: 1px solid;
    width: 200px;
    height: 270px;
    margin: auto;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const FormWrapper = styled.div`
    form{
        display: flex;
        flex-direction: column;
        flex: 1;
        /* background-color: #145DA0; */
        height: 100%;
        border-radius: 10px;
    }
`
const InputDiv = styled.div`
      position: relative;
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid;
  border-right: none;
  padding: 2px 6px;
  border: none;
  margin: 10px 0;
  font-size: 20px;

  input{
    width: 100%;
    outline: none;
    /* border: none; */
    padding: 4px 10px;
    border-radius: 5px;
    height:100%;
    font-size: 17px;
    height: 40px;
  }
`
const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    background-color: black;
    color: white;
    width: 60%;
    border: none;
    border-radius: 16px;
    margin: auto;
`

const AdminUpdatePage = () => {

    //get params
    const {id} = useParams();

    //toast details
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
        error:'',
        success:'',
        formData: new FormData(),
        loading:false,
        change:false
    })

    const {title,desc,category,author,error, success,loading, formData, change} = values;

    useEffect(() => {
        setValues({ ...values, formData });
        init();
    },[change])

    const init = () =>{
        getFileById(id).then((data)=>{
            // console.log(data[0])
            if(data.length===1){
                setValues({...values, title:data[0].title, desc:data[0].desc, category:data[0].category, author:data[0].author,error:'', success:true, loading:false})
            }
            else{
                setValues({...values,error:'No such file',loading:''})
            }
        })
    }

    const handleChange = (name) => (e) => {
        // console.log(name)
        // console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name,value)
        setValues({...values,[name]:value,error:''})
    }

    const {token} = getCookie()

    const handleSubmit = (e) =>{
        e.preventDefault();
        setValues({...values,change:false})
        updatePdf(id,formData,token).then((data)=>{
            if (data.error) {
                toast.error(data.error,toastDetails)
                setValues({ ...values, error: data.error });
            }else{
                toast.success('Successfully updated',toastDetails)
                setValues({
                    ...values,
                    title: "",
                    success: `${data.title}" is successfully updated`,
                    change:true
                  });
            }
        })
    }

    
//   const showError = () => (
//     error && <div><h3>{error}</h3></div>
//   );

//   const showSuccess = () => (
//     success && <div><h3>{success}</h3></div>
//   );


    return (
        <Layout>
            <UpdateContainer>
                <div className="title">PDF details Update</div>
                <UpdateWrapper>
                    <ImageDiv>
                        <img src={`${API}/pdf/photo/${id}`} alt="" />
                    </ImageDiv>
                    <FormWrapper>
                        {/* {showError()}
                        {showSuccess()} */}
                        <form onSubmit={handleSubmit}>
                            <InputDiv>Title
                                <input type="text" placeholder="Title" value={title} onChange={handleChange("title")} />
                            </InputDiv>
                            <InputDiv>Description
                                <input type="text" placeholder="Description" value={desc} onChange={handleChange("desc")} />
                            </InputDiv>
                            <InputDiv>Category
                                <input type="text" placeholder="Category" value={category} onChange={handleChange("category")} />
                            </InputDiv>
                            <InputDiv>Author
                                <input type="text" placeholder="Category" value={author} onChange={handleChange("author")} />
                            </InputDiv>
                            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                        </form>
                    </FormWrapper>
                </UpdateWrapper>
            </UpdateContainer>
            <ToastContainer/>
        </Layout>
    )
}

export default AdminUpdatePage
