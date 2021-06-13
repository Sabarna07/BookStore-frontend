import React,{useState,useEffect,useRef} from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/sidebar/Sidebar'
import '../css/Home.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import BooksSidebar from '../components/Books/BooksSidebar';
import { SidebarData } from '../components/sidebar/SidebarData';
import {useParams} from 'react-router-dom'

const Books = () => {
    return (
        <Layout>

            <BooksSidebar/>
        </Layout>
    )
}

export default Books
