import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component{
  
  state={
      books : [],
  }

  addShelf = (books) =>(
      books.map(book =>{
          !this.props.myBooks.has(book.id) ? 
          book.shelf='none' : book.shelf=this.props.myBooks.get(book.id).shelf;
          return book;
      })
  );

  updateQuery = (query) => {
    BooksApi.search(query)
    .then(books => {
      Array.isArray(books)? this.setState({
        books: this.addShelf(books)
      }): this.setState({
        books: []
      })
    })
  };

  render(){
    return(
      <div>
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.state.query} onChange={event => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <Book book={book} key={book.id} 
              onUpdateBookShelf={this.props.onUpdateBookShelf}/>))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks