import React from 'react'
import {BrowserRouter , Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Files from './components/Files'
import Home from './core/Home'
import Sidebar from './components/sidebar/Sidebar'
import Books from './core/Books';
import Signup from './core/Signup';
import Signin from './core/Signin';
import AdminPage from './core/Admin/AdminPage';
import AdminUpdatePage from './core/Admin/AdminUpdatePage';
import ManageBooks from './core/Admin/ManageBooks';
import AccountActivation from './core/AccountActivation'
import UploadBooks from './core/Admin/UploadBooks';
import AdminRoute from './components/Auth/AdminRoute';

const App = () => {
return(
      <BrowserRouter>
      <Sidebar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/books' exact component={Books} />
          <Route path='/books/:category' exact component={Books} />
          <AdminRoute path='/admin' exact component={AdminPage} />
          <AdminRoute path='/admin/upload/books' exact component={UploadBooks} />
          <AdminRoute path='/admin/manage/books' exact component={ManageBooks} />
          <AdminRoute path='/admin/pdf/update/:id' exact component={AdminUpdatePage} />
          <Route path='/auth/activate/:tokenId' exact component={AccountActivation} />
        </Switch>
      </BrowserRouter>
  )
}

export default App;
