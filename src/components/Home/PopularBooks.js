import React, { useState,useEffect } from 'react'
import Carousel from "react-elastic-carousel";
import {releaseData} from "../ReleaseCardData";
import * as FaIcons from 'react-icons/fa';
import {BookConatiner, BooksWrapper, BookCard,CardImg, CardContent,PopularButton} from './elements/Home.element'
import {Link} from 'react-router-dom'
import {getAllFiles} from '../../actions/pdf'
import { API } from '../../config';
import { DownloadCount} from '../Downlaod';

const PopularBooks = ({heading,books}) => {
    
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 4 },
        { width: 1100, itemsToShow: 5 }
    ];

    return (
        <BookConatiner>
                <div className="heading">{heading}</div>
                <BooksWrapper>
                <Carousel breakPoints={breakPoints}>
                    {books && books.map((item,index)=>(
                        <BookCard key={index}>
                            <CardImg>
                                <Link to='/'>
                                    <img src ={`${API}/pdf/photo/${item._id}`}  alt="" />
                                </Link>
                            </CardImg>
                            <CardContent >
                            <Link to='/' style={{textDecoration:'none'}}>
                                <div className="title">{item.title}</div>
                                <div className="written">By {item.desc}</div>
                            </Link>
                            </CardContent>
                            <PopularButton href={`${item.webContentLink}`} onClick={()=>DownloadCount(item._id,item.title)}>Download <FaIcons.FaDownload/> </PopularButton>
                     </BookCard>
                    ))}
                </Carousel>
                </BooksWrapper>
            </BookConatiner>
    )
}

export default PopularBooks
