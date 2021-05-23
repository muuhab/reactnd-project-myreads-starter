import React from 'react'
import Home from './Components/Home'
import Search from './Components/Search';
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
 const BooksApp=()=>{

  return(
    <BrowserRouter>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Redirect to="/home"/>
    </Switch>
    </BrowserRouter>
  )
}

export default BooksApp
