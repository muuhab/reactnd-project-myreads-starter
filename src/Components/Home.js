import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getAll} from '../BooksAPI'
import {BookRender} from './BookRender'
export class Home extends Component {
  state = {
      books:[]
  };
  
  async componentDidMount(){
     await getAll().then((data)=>this.setState({
          books:data
      }))
      
  }
  updateBooks=(e)=>{
    this.setState(()=>({
      books:e
    }))
  }
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                {this.state.books.length? <BookRender onUpdate={(newBooks)=>this.updateBooks(newBooks)} books={this.state.books.filter((book)=>(book.shelf==='currentlyReading'))}/>:null }
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  {this.state.books.length? <BookRender onUpdate={(x)=>this.updateBooks(x)} books={this.state.books.filter((book)=>(book.shelf==='wantToRead'))}/>:null }

                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  {this.state.books.length? <BookRender onUpdate={(x)=>this.updateBooks(x)} books={this.state.books.filter((book)=>(book.shelf==='read'))}/>:null }

                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        
      </div>
    );
  }
}

export default Home;
