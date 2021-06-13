import React from 'react'
import * as IoIcons from 'react-icons/io';
import * as IoIcons5 from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import { BookConatiner, MainContainer, BannerContainer, BannerContent } from './elements/Home.element'

const MidBanner = () => {
    return (
        <BookConatiner mid>
            <MainContainer>
                <BannerContainer>
                    <div className="heading">
                        <h1>Browse through our library</h1>
                        <a href="#">Browse Collection <IoIcons.IoMdArrowRoundForward/> </a>
                    </div>
                    <BannerContent>
                        <div className="content">
                            <div className="icons">
                                <IoIcons5.IoBook/>
                            </div>
                            <div className="lines">
                                <h5>All Kind of Books</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt, sapiente officiis odio tempore voluptatibus et cupiditate libero consectetur molestiae.</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="icons">
                                <FaIcons.FaPencilAlt/>
                            </div>
                            <div className="lines">
                                <h5>Many Author</h5>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima nesciunt ipsa culpa? Assumenda nemo aut delectus ipsum. Quos, perferendis aliquid!</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="icons">
                                <FaIcons.FaDownload/>
                            </div>
                            <div className="lines">
                                <h5>Easy Downloadable PDFs</h5>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam qui consectetur nihil ipsam. Itaque fugiat sint, dolores consequuntur optio beatae?</p>
                            </div>
                        </div>
                    </BannerContent>
                </BannerContainer>
            </MainContainer>
        </BookConatiner>
    )
}

export default MidBanner
