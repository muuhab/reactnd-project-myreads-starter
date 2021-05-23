import React from "react";
import {getAll, update} from '../BooksAPI'

export const BookRender = ({ books }) => {
  const handleSelect=(book,e)=>{
    update(book,e)
}
  return (
    <ol className="books-grid">
      { books.map((book) => (
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
                    <select onChange={(e)=>handleSelect(book,e.target.value)}>
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading" selected={book.shelf==='currentlyReading' ? true:false}>
                        Currently Reading
                      </option>
                      <option value="wantToRead"selected={book.shelf==='wantToRead' ? true:false}>Want to Read</option>
                      <option value="read" selected={book.shelf==='read' ? true:false}>Read</option>
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
