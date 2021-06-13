import React,{useState,useEffect,useRef} from 'react'
import {Conatiner, HeroWrapper, HeroSlide, HeroSlider, HeroImage,HeroContent,Button, Arrow, SliderButtons, PrevArrow, NextArrow} from './elements/Home.element' 

import {homeData} from './elements/homeData'

const Hero = () => {

    const [current,setCurrent] = useState(0)
    const length = homeData.length
    const timeout = useRef()

    useEffect(()=>{
        const nextSlide = () =>{
            setCurrent(current === length-1 ? 0 : current+1)
        };
        timeout.current = setTimeout(nextSlide,5000);
        return function(){
            if(timeout.current){
                clearTimeout(timeout.current) 
            }
        };
    },[current,length])

    const nextSlide = () =>{
        if(timeout.current){
            clearTimeout(timeout.current) 
        }
        setCurrent(current === length-1 ? 0 : current+1)
        // console.log(current)
    }

    const prevSlide = () =>{
        if(timeout.current){
            clearTimeout(timeout.current) 
        }
        setCurrent(current === 0 ? length-1 : current-1)
        // console.log(current)
    }

    return (
        <Conatiner>
                <HeroWrapper>
                    {homeData.map((item,index)=>(
                    <HeroSlide key={index}>
                        { index === current && (
                        <HeroSlider>
                            <HeroImage src={item.img} alt={item.title} />
                            <HeroContent>
                                <p>{item.subtitle}</p>
                                <h1>{item.title}</h1>
                                <Button primary big to='/books' css={`max-width:160px; `} >
                                    See More
                                <Arrow/>    
                                </Button>
                            </HeroContent>
                        </HeroSlider>
                        )}
                    </HeroSlide>
                    ))}
                    <SliderButtons>
                    <PrevArrow onClick={prevSlide}/>
                    <NextArrow onClick={nextSlide}/>
                </SliderButtons>
                </HeroWrapper>
           </Conatiner>
    )
}

export default Hero
