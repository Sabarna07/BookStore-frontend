import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deletePdf, getAllFiles, searchPdf, getStatus, updateStatus } from '../../actions/pdf'
import { useQuery } from '../../hooks/CustomHooks'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../actions/auth'
import Preloader from '../Preloader'
import LoadingOverlay from 'react-loading-overlay';

const AdminContainer = styled.div`
    padding: 102px 40px 30px 39px;
    position: relative;

    .title{
        text-align: center;
        font-size: 38px;
    }
`

const SearchBar = styled.div`
  margin: auto;
  padding: 0 2px;
  flex: 1;
  height: 45px;
  display: flex;
  width: 50%;
`
const SerachForm = styled.form`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #145DA0;
  height: 100%;
  border-radius: 10px;
`
const InputDiv = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  border: 1px solid;
  border-right: none;
  padding: 2px 6px;
  border: none;

  input{
    width: 100%;
    outline: none;
    border: none;
    padding: 4px 6px;
    border-radius: 5px;
    height:100%;
  }
`
const Button = styled.div`
  cursor: pointer;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 0 2px 2px 0 ;
`

const StatusCategory = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top:15px;
    border-bottom: 1px solid;
    padding: 15px 0px;

    .status{
        padding: 10px 10px;
        text-align: center;
        border-radius: 10px;
        margin: 0 10px;
        background-color: aqua;
        font-weight:600;

        a{
            text-decoration: none;
            color:#fff;
        }
    }
`

const AdminWrapper = styled.div`
    width: 100%;
    margin-top: 10px;
`

const Strong = styled.strong`
            padding: 10px 13px;
            margin: 6px 29px;
            color: #fff;
            background-color: ${({statuscolor})=>statuscolor==="Processed" ? '#1496BB' : statuscolor==="Popular" ? '#EBC944' : statuscolor==="Trending" ? '#00AA00' : statuscolor==="Processing" ? '#00008B' : statuscolor==="Cancel" ? '#C02F1D' : ''};
            border-radius: 10px;
`

const WrapperContainer = styled.div`
    padding: 20px 20px;
    border-bottom: 1px solid;

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr;

        .book-details{
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            li{
            font-size: 20px;
            color: #828282;
            }
        }
        .buttons{
            padding: 20px 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            .links{
                display: flex;
                flex-direction: column;

                a{
                    padding: 10px;
                    color: #fff;
                    border-radius: 10px;
                    text-decoration: none;
                    cursor: pointer;
                    margin: 5px 10px;
                    text-align: center;

                    &:nth-child(1){
                        background-color: #059DC0;
                    }
                    &:nth-child(2){
                        background-color: red;
                    }
                    &:nth-child(3){
                        background-color: #FAD02C;
                    }
                }
            }
        }
    }
`
const StatusDiv = styled.div`
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    select{
        border: none;
    /* height: 46px; */
        background: #001F3D;
        border-radius: 10px;
        padding: 12px 10px;
        cursor: pointer;
        color: #fff;
        outline: none;
        border-bottom: 2px solid;
        font-weight: 600;

        option{
            background-color: white;
            color:black;
        }
    }
`

const AdminManageBooks = () => {

    const toastDetails = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,    
    }

    const [values, setValues] = useState({
        pdfs:[],
        pdfsCopy:[],
        message:'',
        error:'',
        search:'',
        loading:false
    })
    const [limit,setLimit] = useState(8);
    const [size,setSize] = useState()
    const [status,setStatus] = useState([])
    
    const {pdfs, error, message,search,pdfsCopy,loading} = values

    let newPfds = [];
    newPfds = pdfs

    useEffect(() => {
        init();
        getAllStatus();
    }, [])

    
    //search form submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        init();
        // console.log(search)
    }

    //for search
    const handleChange = name => e =>{
        setValues({...values ,[name]:e.target.value})
    }

    //get pdfs by search and all pdfs 
    const init = () =>{
        setValues({...values,error:"",loading:true})
        if(search){
            searchPdf({search}).then((data)=>{
                if(data.length>0){
                    setValues({...values, pdfs:data, pdfsCopy:data, error:'',loading:false})
                    setSize(data.length);
                }
                else{
                    // setValues({...values, error:data.message, success:false});
                    toast.error(data.message,toastDetails)
                }
            })
        }
        else{
            getAllFiles().then((data)=>{
                if(data.length>0){
                    setValues({...values, pdfs:data, pdfsCopy:data,error:'',loading:false})
                    setSize(data.length);
                }
                else{
                    setValues({...values, error:"Something went wrong"});
                    toast.error("Something went wrong",toastDetails)
                }
            })
        }
    }

    //get all status
    const getAllStatus = () =>{
        getStatus().then((data)=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setStatus(data)
            }
        })
    }

    //delect pdf
    const deleteAlert = (id) =>{
        let answer = window.confirm("Are you sure you want to delete this book")
        if(answer){
            destroyPdf(id)
        }
    }

    const {token} = getCookie()

    const destroyPdf = (id) =>{
        deletePdf(token,id).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                init();
            }
        })
    }

    //handle status change
    const handleStatus = (e,id) =>{
        updateStatus(id,e.target.value).then((data)=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                // console.log(data)
                init()
            }
        })
    }

    //show status
    const showStatus = (item) =>(
        <div>
            <select id="status" onChange={(e)=>handleStatus(e,item._id)}>
                <option>Update Status</option>
                {status.map((item,index)=>(
                    <option id="css" key={index} value={item} >{item}</option>
                ))}
          </select>
        </div>
    )

    //filter status
    const filterStatusPdf = (e) =>{
        const updatedPdfs = pdfsCopy.filter(currEelement=>{
            return currEelement.status === e;
        })
        setValues({...values,pdfs:updatedPdfs})
        // setPdfByStatus(updatedPdfs)
    }

    const showStatusCategory = () =>(
        <StatusCategory>
            <div className="status" style={{backgroundColor:"#EBC944", padding:'10px 20px'}} onClick={()=>init()}><Link>All</Link></div>
            <div className="status" style={{backgroundColor:"#EBC944"}} onClick={()=>filterStatusPdf('Popular')}><Link>Popular</Link></div>
            <div className="status" style={{backgroundColor:"#00AA00"}} onClick={()=>filterStatusPdf('Trending')}><Link>Trending</Link></div>
            <div className="status" style={{backgroundColor:"#1496BB"}} onClick={()=>filterStatusPdf('Processed')}><Link>Processed</Link></div>
            <div className="status" style={{backgroundColor:"#00008B"}} onClick={()=>filterStatusPdf('Processing')}><Link>Processing</Link></div>
            <div className="status" style={{backgroundColor:"#C02F1D"}} onClick={()=>filterStatusPdf('Cancel')}><Link>Cancel</Link></div>
        </StatusCategory>
    )

    const managePdfs = (item,index) =>(
        <WrapperContainer key={index}>
                <StatusDiv>
                    <Strong statuscolor={`${item.status}`}>
                        {item.status}
                    </Strong>
                    {showStatus(item)}
                </StatusDiv>
                <div className="grid">
                    <div className="book-details">
                        <div>
                        <h3>Book</h3>
                        <ul>
                            <li>Title : {item.title}</li>
                            <li>Author : {item.author}</li>
                            <li>Description : {item.desc}</li>
                            <li>Category : {item.category}</li>
                        </ul>
                        </div>
                    </div>
                    <div className="buttons">
                        <div className="links">
                            <Link to={`/admin/pdf/update/${item._id}`}>
                                <span>Update</span>
                            </Link>
                            <Link onClick={()=>deleteAlert(item._id)}>
                                <span>Delete</span>
                            </Link>
                            <a href={`${item.webViewLink}`} target="_blank">
                                <span>View</span>
                            </a>
                        </div>
                    </div>
                </div>
            </WrapperContainer>
    )

    return (
        <>
        <LoadingOverlay active={loading} spinner={<Preloader/>}>
            <ToastContainer/>
        <AdminContainer>
            <div className="title">Manage Books</div>
            <SearchBar>
              <SerachForm onSubmit={handleSubmit}>
                <InputDiv>
                  <input type="text" placeholder='Search...' value={search} onChange={handleChange("search")} />
                </InputDiv>
                <Button onClick={handleSubmit} >
                  <AiIcons.AiOutlineSearch/>
                </Button>
              </SerachForm>
            </SearchBar>
            {showStatusCategory()}

            {/* ALL PDF LISTS AND PDFs BY FILTER*/}
            <AdminWrapper>
            {pdfs.map((item,index)=>(managePdfs(item,index)))}
            </AdminWrapper>

        </AdminContainer>
        </LoadingOverlay>
        </>
    )
}

export default AdminManageBooks
