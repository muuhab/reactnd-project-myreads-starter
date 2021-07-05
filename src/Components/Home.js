import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getAll} from '../BooksAPI'
import {BookRender} from './BookRender'
import BeatLoader from "react-spinners/BeatLoader";


export class Home extends Component {
  state = {
      books:[],
      loading:false
  };
  loading=()=>{
    this.setState({
      loading:!this.state.loading
    })
  }
  
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

    const mystyle = {
      position:"fixed",
      top:"50%",
      left:"50%",
      transform:"translate(50%,50%)",
      color:"blue",
      zIndex:'20'

    };
    const dd={
      backgroundColor:"rgba(0,0,0,0.7)",
      height:"100%",
      width:"100%",
      zIndex:"2",
      position:"fixed"
    };

    return (
      
      <div className="app">
       {this.state.loading&&
        <div style={dd}>

          <BeatLoader css={mystyle}  loading={this.state.loading} color={"#60ac5d"}  size={15} margin={2}    />
        </div>
        }
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                {this.state.books.length? <BookRender loading={this.loading} onUpdate={(newBooks)=>this.updateBooks(newBooks)} books={this.state.books.filter((book)=>(book.shelf==='currentlyReading'))}/>:null }
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  {this.state.books.length? <BookRender loading={this.loading} onUpdate={(x)=>this.updateBooks(x)} books={this.state.books.filter((book)=>(book.shelf==='wantToRead'))}/>:null }

                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  {this.state.books.length? <BookRender loading={this.loading} onUpdate={(x)=>this.updateBooks(x)} books={this.state.books.filter((book)=>(book.shelf==='read'))}/>:null }

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
