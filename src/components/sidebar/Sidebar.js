import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, Router, useHistory, withRouter } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import Layout from '../Layout';
import {searchPdf} from '../../actions/pdf'
import { isAuth, signout } from '../../actions/auth';


const Nav = styled.div`
  background: #0C2D48;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: fixed;
  z-index: 9999;
  width: 100%;

  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .header1{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex: 0 1 768px;
  }
  .header2{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    min-width: 225px;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

  /* @media screen and (max-width:768px){
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  } */
`;

const SearchBar = styled.div`
  margin: 0 30px 0 30px;
  padding: 0 2px;
  flex: 1;
  height: 40px;
  display: flex;
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

  input{
    width: 100%;
    outline: none;
    border: none;
    padding: 4px 6px;
    border-radius: 5px
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
  border: 1px solid;
`
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  color: #fff;

  .signin, .signup, .signout, .admin{
    padding: 6px 9px;
    margin: 0 13px;
    /* background: aquamarine; */
    border-radius: 10px;
    border: 1px solid;
    border-color: bisque;
    cursor: pointer;
    
    a{
      text-decoration:none !important;
      border-color: bisque;
      color: #fff;
    }
  }
  .signin:hover, .signup:hover{
    box-shadow: inset 1px 1px 8px 5px rgba(179,180,196,0.49);
  }

`

const SidebarNav = styled.nav`
  background: #0C2D48;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  /* left: 0; */
  transition: 350ms;
  z-index: 100;

  /* @media screen and (max-width:768px){
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  } */
`;

const SidebarWrap = styled.div`
  width: 100%;

  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;

const Logo = styled.div`  
    color: #fff;
    font-size: 25px;
    margin-left: 15px;
    min-width: 150px;

    a{
      text-decoration: none;
      color:#fff;
    }
`


const Sidebar = ({history}) => {

  // const history = useHistory()

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [values,setValues] = useState({
    search:'',
    pdf:[],
  })
  
  const {search, pdf} = values

  const handleChange = name => e =>{
    setValues({...values ,[name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    history.push(`/books?search=${search}`);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <div className='header'>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Logo>
            <a href="/">
              BOOK STORE
            </a>
          </Logo>
          </div>
          <div className='header1'>
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
          </div>
          <div className="header2">
            <ButtonDiv>
              {isAuth() && isAuth().role === 1 && (
                <div className="admin"><Link to="/admin">Admin</Link></div>
              )}
            	  {!isAuth() && (
                  <React.Fragment>
                    <div className="signin"><Link to="/signup">Singup</Link></div>
                    <div className="signup"><Link to="/signin">Singin</Link></div>
                </React.Fragment>
                )}
                {isAuth() && (
                  <div className="signout"><Link onClick={()=>signout(()=>{history.push('/')})}>Singout</Link></div>
                  )}
              </ButtonDiv>
          </div>
        </Nav>
        <SidebarNav sidebar = {sidebar} >
          <SidebarWrap>
          <div className='header'>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <Logo>
              BOOK STORE
            </Logo>
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default withRouter(Sidebar);