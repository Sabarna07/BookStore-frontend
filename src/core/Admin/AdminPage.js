import React from 'react'
import Layout from '../../components/Layout'
import AdminManageBooks from '../../components/Admin/AdminManageBooks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { isAuth } from '../../actions/auth'

const Container = styled.div`
    padding: 100px 20px 20px 20px;
    width: 100%;

    .title{
        text-align: center;
        font-size: 36px;
        padding: 10px 0px;
        margin-bottom: 30px;
        font-weight:600;
    }
`
const Wrapper = styled.div`
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 400px;

    .admin-link, .admin-details{
        padding: 20px 30px;
        flex-direction: column;
        display: flex;
        align-items: center;

        li{
            padding: 10px 0px;
            font-size: 18px;
            margin: 10px 0;
        }
        a{
            text-decoration: none;
        }
    }
    .admin-details{
        li{
            font-size: 20px;
            color: #828282;
        }
    }
`


const AdminPage = () => {

    const {name,email,role} = isAuth();

    return (
        <Layout>
            {/* <AdminPannel/> */}
            <Container>
                <div className="title">Welcome Admin</div>
                <Wrapper>
                    <div className="admin-link">
                        <h3>Admin Links</h3>
                        <ul>
                            <li><Link to='/admin/upload/books'>Upload Books</Link></li>
                            <li><Link to='/admin/manage/books'>Manage Books</Link></li>
                        </ul>
                    </div>
                    <div className="admin-details">
                        <div className="cardDiv">
                            <h3>Admin Details</h3>
                            <ul>
                                <li>Name : {name}</li>
                                <li>Email : {email} </li>
                                <li>Role : {(role===1) ? 'Admin' : 'User'}</li>
                            </ul>
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </Layout>
    )
}

export default AdminPage
