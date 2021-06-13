import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const MainDiv = styled.div``

export const FilterDiv = styled.div`
  background: #fefe;
  border-right: 1px solid ;
  width: 250px;
  height: 100%;
  /* margin-top: 80px; */
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  /* left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; */
  left: 0;
  transition: 350ms;
  z-index: -1;
  border-top: 1px solid #fff;
`

export const ContentDiv = styled.div`
  /* margin-left: 250px; */
  height: 100%;
  padding: 90px 20px 0px 20px;
  height: 100vh;
  min-height: fit-content;

  .button{
    width: 40%;
    margin: auto;

    @media screen and (max-width:768px){
      width: 100%;
    }
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
export const Card = styled.div`
    width: 235px;
    border: 1px solid;
    height: 100%;
    padding: 10px;
    /* margin: auto; */
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px 62px;
    overflow: hidden;
    position: relative;
    z-index: 20;
    margin-left: 40px;
    margin-left: 40px;
  
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({image})=>(image ? `url(${image})` : '')};
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.33;
      transform: scale(2);
    }

    .image{
      width: 100%;
      /* height: 164px; */
      height: 240px;
      margin: auto;
      border: 1px solid;
      border-radius: 10px 62px;
      overflow: hidden;
      z-index: 999;
      position: relative;

      img{
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
    .content{
      width: 100%;
      padding: 5px 16px 8px;
      z-index: 999;
      position: relative;

      .title{
        color: #212529;
        font-size: 16px;
        font-weight: 500;
      }

      .written{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 0px;
        font-size: 14px;
        font-weight: 500;
        color: #343a40;
        /* color: rgb(135, 135, 135); */
      }

      .desc{
        display: inline-block;
        width: calc(100%);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding: 5px 0px;
        font-weight: 400;
      }
    }
    .card-button-footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
`

export const Button = styled(Link)`
    background:${({primary})=>(primary ? "#000d1a" : "cd853f")};
    outline:none;
    border:none;
    min-width:170px;
    /* max-width:125px; */
    cursor:pointer;
    transition:0.3s;
    display:flex;
    justify-content: center;
    align-items: center;
    padding:${({big})=>(big ? "16px 40px" : "10px 0px")};
    color:${({primary})=>(primary ? "#fff" : "#000d1a")};
    font-size:${({fontbig})=>(fontbig ? "16px" : "12px")};
    border-radius: 10px 62px;
    text-decoration: none !important;
    z-index: 999;
    position: relative;
    background-image: linear-gradient(to right, #B6E2D3 0%, #000C2C  51%, #16222A  100%);
    font-weight: 600;
    
    a{
      text-decoration: none !important;
      color: #fff;
    }

`
export const LoadMoreBtn = styled(Link)`
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
  color: #323232;
  font-size: 18px;
  font-weight: 500;
  margin-top:10px;
  padding: 10px 20px;
  background: #ab2135;
  border-radius: 36px;
background: #efefee;
box-shadow:  5px -5px 9px #a3a3a2,
             -5px 5px 9px #ffffff;

  &:hover{
    border-radius: 36px;
background: #efefee;
box-shadow: inset -7px 7px 14px #d7d7d6,
            inset 7px -7px 14px #ffffff;
    color:#323232;
  }


`
