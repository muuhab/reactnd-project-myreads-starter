import React from "react";
import {getAll, update} from '../BooksAPI'

export const BookRender = ({ books,onUpdate,loading }) => {
 
  const handleSelect=(book,e)=>{
    loading()
    update(book, e)
    .then(getAll)
    .then((data) => onUpdate(data))
    .then(loading)
    
}
  return (

    <ol className="books-grid">
      { books.filter((book)=>(book.imageLinks!=null)).map((book) => (
            
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select onChange={(e)=>handleSelect(book,e.target.value)} defaultValue={book.shelf?book.shelf:'none'} >
                      <option value="move" disabled  >
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))
        }
    </ol>
  );
};
