import styled,{css} from 'styled-components/macro'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {Link} from 'react-router-dom'


export const Conatiner = styled.div`
    height: 100vh;
    /* max-height:1100px; */
    position:relative;
    overflow:hidden;
    
`
export const HeroWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    position:relative;
`
export const HeroSlide = styled.div`
    width:100%;
    height:100%;
    z-index:1;
`
export const HeroSlider = styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    transition: all 0.3s;
`
export const HeroImage = styled.img`
    position:absolute;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    object-fit:cover;
`
export const HeroContent = styled.div`
    position:relative;
    z-index:10;
    display:flex;
    flex-direction:column;
    max-width:1600px;
    width:calc(100% - 100px);
    color:white;

    h1{
        font-size:clamp(1rem, 8vw, 3rem);
        font-weight:400;
        text-transform:uppercase;
        text-shadow:0px 0px 20px rgba(0,0,0,0.4);
        text-align:left;
        margin-bottom:0.8rem;
    }
    p{
        font-size: 19px;
        text-shadow:0px 0px 20px rgba(0,0,0,0.4);
    }
`
export const Button = styled(Link)`
    background:${({primary})=>(primary ? "#000d1a" : "cd853f")};
    outline:none;
    border:none;
    min-width:100px;
    max-width:200px;
    cursor:pointer;
    text-decoration:none;
    transition:0.3s;
    display:flex;
    justify-content: center;
    align-items: center;
    padding:${({big})=>(big ? "16px 40px" : "14px 24px")};
    color:${({primary})=>(primary ? "#fff" : "#000d1a")};
    font-size:${({fontbig})=>(fontbig ? "16px" : "12px")};

    text-decoration: none !important;

    &:hover{
        transform:translateY(-2px);
        color: #fff !important;
    }
`
export const Arrow = styled(IoIcons.IoMdArrowRoundForward)`
    margin-left:0.8rem;
`
const arrowButtons = css`
    width:40px;
    height:40px;
    color:#fff;
    background:#000d1a;
    border-radius:50px;
    padding:10px;
    margin-right:1rem;
    user-select:none;
    transition:0.3s;

    &:hover{
        background:#cd853f;
        transform:scale(1.05);
    }
`
export const SliderButtons = styled.div`
    position:absolute;
    right:50px;
    bottom:10px;
    display:flex;
    z-index:10;
`
export const PrevArrow = styled(IoIcons.IoMdArrowBack)`
    ${arrowButtons}
`;
export const NextArrow = styled(IoIcons.IoMdArrowForward)`
    ${arrowButtons}
`
// POPULAR BOOKS

export const BookConatiner = styled.div`
    /* height: 100vh; */
    height: ${({mid})=>(mid ? '' : '100vh')};
    max-height: ${({mid})=>(mid ? '' : '1100px')};;
    position: relative;
    overflow: hidden;
    /* padding: 50px 30px; */
    padding: ${({mid})=>(mid ? '' : '50px 30px')};
    background: ${({dark})=>(dark ? "#1A1423" : '#E3E8E9')};
    text-decoration: none !important;

    .heading{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin: 0 0 20px 0px;
    }
`
export const BooksWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
export const BookCard = styled.div`
    max-height: 430px;
    width: 195px;
    border: 1px solid black;
    margin: 0px 10px;
    padding: 15px;
    background: #fff;
    border-radius: 20px;
`
export const CardImg = styled.div`
    /* height: 150px; */
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 2px rgb(72 53 53 / 75%);
    background-color: #E3E8E9;
    width: 100%;
    height: 164px;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
export const CardContent = styled.div`
    /* margin: 10px 0px; */
    text-decoration: none !important;
    width: 100%;
    padding: 5px 16px 8px;
    z-index: 999;
    position: relative;
    overflow: hidden;

    .title{
        /* font-size: 14px; */
        /* font-weight: 700; */
        padding: 0 0 10px 0px;
        text-align: center;
        /* color: #1F232C; */
        color: #212529;
        font-size: 16px;
        font-weight: 500;
    }
    .written{
        font-size: 14px;
        padding: 0 0 10px 0;
        text-align: center;
        color: #1F232C;
        font-weight: 600;
        width: calc(100%);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`
export const PopularButton = styled.a`
    padding: 5px;
    text-decoration: none;
    /* background: aqua; */
    border: 1px solid;
    border-radius: 10px;
    color: #54086B;
    transition: .2s ease-in-out ;
    text-decoration: none !important;

    &:hover{
        background: #54086B;
        color: #E3E8E9;
    }
`

// POPULAR BOOKS END

// MID BANNER

export const MainContainer = styled.div`
     /* width: 100%;
    height: 100%;  */
`
export const BannerContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(1,300px);
    /* height: 100vh; */
    background: #F3F5F9;

    .heading{
        text-align: center;
        font-size: 50px;
        text-align: center;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        letter-spacing: 2px;
        color: #F2EEF7;
        background-color: #1A1423;
        margin: 0;
        a{
            font-size: 18px;
            color: #F2EEF7;
            text-decoration: none;
        }
    }
/* 
    @media screen and (max-width:868px){
        height: '';
    } */
`
export const BannerContent = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 0px 30px 0;

    .content{
        width: 270px;
        height: 270px;
        position: relative;
        /* display: inline-block; */
        /* margin: 10px 3px; */
        margin: auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icons{
            font-size: 60px;
            margin-bottom: 10px;
        }
        .lines{
            text-align: center;
        }

    }

    /* @media screen and (max-width:868px){
        flex-direction: column;
        justify-content: center;
    } */
`


// MID BANNER END