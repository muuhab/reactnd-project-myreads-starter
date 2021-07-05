import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {search,getAll} from '../BooksAPI'
import  {BookRender} from './BookRender'

class Search extends Component {
  state={
    mybooks:[],
    books:[],
    query:""
  }
  async componentDidMount(){
    const books=await getAll()
    this.setState({
      mybooks:books
    })
  }
  clearSearch=()=>{
    this.setState(()=>({
      books:[]
    }))
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      search(`${this.state.query}`).then(result=>{if(result){
        this.state.mybooks.map(mybook=>{if(!result.error)result.map(book=>{
          if(mybook.id===book.id)
            book.shelf=mybook.shelf
            return book
        })
        return mybook
      })
        this.setState({
          books:result
        })

      }
        else
        this.clearSearch()})
  }
}
   handleSearch=(e)=>{
    this.setState(()=>({
      query: e
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
