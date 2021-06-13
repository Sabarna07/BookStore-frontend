import React, { useEffect, useState } from 'react'
import {Link, useLocation, withRouter,useParams} from 'react-router-dom'
import {MainDiv,FilterDiv,ContentDiv,ContentWrapper,Card,Button,LoadMoreBtn} from './Element/Books.element'
import PopularBooks from '../Home/PopularBooks'
import * as FaIcons from 'react-icons/fa';
import { Hourglass } from 'react-spinners-css';
import { useQuery } from '../../hooks/CustomHooks';
import {downloadFile, getAllFiles, searchPdf,getPdfByCategory} from '../../actions/pdf'
import { API } from '../../config';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Preloader from '../Preloader';
import {DownloadCount} from '../Downlaod'
import LoadingOverlay from 'react-loading-overlay';

const BooksSidebar = () => {

    //get query
    const query = useQuery();
    const search = query.get('search')

    //get params
    const {category} = useParams()
    // console.log(category)

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
    
    const [values, setValues] = useState({
        pdfs:[],
        message:'',
        error:'',
        loading:false
    })
    const [limit,setLimit] = useState(8);
    const [size,setSize] = useState()


    const {pdfs, error, message,loading} = values
    
    useEffect(() => {
        setValues({...values,loading:true})
        init();
    }, [search,category])
    
    const init = () =>{
        if(search){
            searchPdf({search}).then((data)=>{
                if(data.length>0){
                    setValues({...values, pdfs:data, error:'',loading:false})
                    setSize(data.length);
                }
                else{
                    toast.error(data.message,toastDetails)
                    setValues({...values, error:data.message,loading:false});
                }
            })
        }
        if(category){
            getPdfByCategory(category).then((data)=>{
                console.log(data)
                if(data.length>0){
                    setValues({...values, pdfs:data, error:'',loading:false})
                }
                else{
                    toast.error("No such books found",toastDetails)
                    setValues({...values,error:data.message,loading:false})
                }
            })
        }
        if(!search && !category){
            getAllFiles().then((data)=>{
                if(data.length>0){
                    setValues({...values, pdfs:data, error:'',loading:false})
                    setSize(data.length);
                }
                else{
                    toast.error("Something went wrong",toastDetails)
                    setValues({...values, error:"Something went wrong",loading:false});
                }
            })
        }
    }

    const handleLoadMore = () =>{
        if(limit<size){
            setLimit(limit=>limit+8)
        }
        else{
            
        }
    }

    const loadMore = () =>(
        <LoadMoreBtn onClick={handleLoadMore}>Load More <Hourglass size={10} style={{width:'40px',height:'40px'}}/> </LoadMoreBtn>
    )

//    const showError = () =>(
//        error && <div><h3>{error}</h3></div> 
//    )
//    const showMessage = () =>(
//        error && <div><h3>{message}</h3></div> 
//    )

//    const handleDownload = (id,title) =>{
//         Downloa
//    }

    return (
        
            <LoadingOverlay active={loading} spinner={<Preloader/>}>
            {/* <MainDiv> */}
            {/* <FilterDiv>
                //sidedata 
            </FilterDiv> */}
            <ContentDiv>
                {/* {showError()}
                {showMessage()} */}
                <ContentWrapper>
                    {pdfs.slice(0,limit).map((item,index)=>(

                        <Card image={`${API}/pdf/photo/${item._id}`} key={index}>
                        <div className="image">
                            <img src={`${API}/pdf/photo/${item._id}`} alt="" />
                        </div>
                        <div className="content">
                            <div className="title">{item.title}</div>
                            <div className="written">By {item.author}</div>
                            <div className="desc">
                                {item.desc}
                            </div>
                        </div>
                        <div className="card-button-footer">
                        <Button primary="true" fontbig="true"><a href={`${item.webContentLink}`} onClick={()=>DownloadCount(item._id)}>Download<FaIcons.FaDownload style={{marginLeft:'5px',textAlign:'center'}}/></a>                        
                        </Button>
                        <span><FaIcons.FaHeart style={{fontSize:'20px',color:'#FF0000'}}/><strong>18</strong></span>
                        </div>
                    </Card>
                    ))}
                </ContentWrapper>
                    <div className="button">
                        {size && size>=limit && loadMore()}
                    </div>
            </ContentDiv>
            <ToastContainer/>
        {/* </MainDiv> */}
        </LoadingOverlay>
    )
}

export default BooksSidebar
