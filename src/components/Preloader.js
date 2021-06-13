import React from 'react'
import styled,{keyframes} from 'styled-components'

const loading1 = keyframes`
    0% { transform : translateX(0rem) }
    50% { transform : translateX(10rem) }
    100% { transform : translateX(0rem) }
`
const loading2 = keyframes`
    0% { transform : translateX(0rem) }
    50% { transform : translateX(-10rem) }
    100% { transform : translateX(0rem) }
`

const Conatiner = styled.div`
    width: 100%;
    /* max-width: 1500px; */
    height: 100vh;
    /* background-color: #0B2840; */
    position: relative;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    /* top: 30%;
    left: 50%;
    transform: translate(-50%, -50%); */

    .part1{
        font-weight:600;
        font-size:4rem;
        color: #67D7ED;  
    }
    .part2{
        /* background-color: #0e76a8; */
        border-radius:5px;
        color:white;
        padding-left:0.5rem;
        padding-right:0.5rem;
        font-weight:600;
        font-size:4rem;
        margin-left: 0.5rem;
    }
    .loader{
        position: absolute;
        top: 57%;
        /* left:50%;
        margin-top:2rem;
        transform: translate(-50%, -50%); */
        height:5px;
        width:15rem;
        background-color:lightgrey;
        display: flex;
        justify-content: space-between;

        .loading1{
            width: 5rem;
            background: #3CBED0;
            height: 5px;
            animation: ${loading1} 1.8s infinite;
        }
        .loading2{
            background: #E6D350;
            width: 5rem;
            height: 5px;
            animation: ${loading2} 1.8s infinite;
        }
    }
    h6{
        position: absolute;
        color: #ffff;
        top: 23rem;
    }
`


const Preloader = () => {
    return (
        <Conatiner>
            <div class="part1">
                Book
            </div>
            <div class="part2">
                Store
            </div>

            <div className="loader">
                <div className="loading1"></div>
                <div className="loading2"></div>
            </div>
            <h6>Please wait......</h6>
        </Conatiner>
    )
}

export default Preloader
