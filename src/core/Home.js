import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/sidebar/Sidebar'
import '../css/Home.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import PopularBooks from '../components/Home/PopularBooks'
import MidBanner from '../components/Home/MidBanner'
import Hero from '../components/Home/Hero';
import {getAllFiles} from '../actions/pdf'
import Preloader from '../components/Preloader';

const Home = () => {

    const [values, setValues] = useState({
        error:'',
        success:'',
        loading:false,
        pdfs:[]
    })
    const [books,setBooks] = useState([])

    const {error,loading,success,pdfs} = values

    useEffect(() => {
       init();
       handleFilterByStatus()
    }, [])

    const init = () =>{
        getAllFiles().then((data,error)=>{
            // console.log(data)
            if(error){
                setValues({...values, error:error})
            }
            else{
                // setBooks(data)
                setValues({...values,loading:false,pdfs:data})
            }
        })
    }
    
    const handleFilterByStatus = () =>{
        const updatePdfByStatus = pdfs.filter(element=>{
            return element.status === "Popular"
        })
        setBooks(updatePdfByStatus)
    }

    return (
        // <Sidebar/>
        <Layout>
            
           {/* Banner */}
           <Hero/>

           {/* POPULAR BOOKS */}
            <PopularBooks heading={'POPULAR BOOKS'} books={books} />

            {/* {JSON.stringify(books)} */}

            {/* Banner 2 */}
            <MidBanner/>

            {/* New Books */}
            <PopularBooks heading={'NEW BOOKS'} books={books}/>
        </Layout>
    )
}

export default Home
