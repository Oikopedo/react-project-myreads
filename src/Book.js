import React from 'react'

function Book (props){
  return(
    <li>
      <div className="book">
        <div className="book-top">
          {typeof props.book.imageLinks!=="undefined" && 
            <div className="book-cover" style={{ width: 128, height: 193, 
              backgroundImage:`url(${props.book.imageLinks.smallThumbnail})` }}>
            </div>}
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={(event) => (props.onUpdateBookShelf(event,props.book))}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead" >Want to Read</option>
              <option value="read" >Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {typeof props.book.authors!=="undefined" && props.book.authors.map(author =>(
          <div className="book-authors" key={author}>{author}</div>  
        ))}
      </div>
    </li>
  );
}

export default Book