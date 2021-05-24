import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {search} from '../BooksAPI'
import  {BookRender} from './BookRender'

class Search extends Component {
  state={
    books:[],
    query:""
  }
  clearSearch=()=>{
    this.setState(()=>({
      books:[]
    }))
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      search(`${this.state.query}`).then((data)=>{data?this.setState({
        books:data
      }):this.clearSearch()})
    }
  }
   handleSearch=(e)=>{
    this.setState(()=>({
      query: e.trim()
    })
    )
  }
  render(){
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/home" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e)=>this.handleSearch(e.target.value)} value={this.state.query}  />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length? <BookRender onUpdate={()=>{}} books={this.state.books}/>:null }
           
        </div>
      </div>
    )
  }

}

export default Search
