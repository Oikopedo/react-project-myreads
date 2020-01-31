import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component{

  bookCreator = () => {
    const bookIterator =this.props.shelf.books.keys();
    let res = bookIterator.next();
    const arr = [];
    while(!res.done){
      arr.push(<Book book={this.props.books.get(res.value)} 
        key={res.value} onUpdateBookShelf={this.props.onUpdateBookShelf}/>);
      res=bookIterator.next();
    }
    return arr;
  }
  
  render(){
    return(
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.bookCreator()}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks