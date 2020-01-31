import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class BooksApp extends React.Component {

   
  state = {
    shelfs : new Map([
      ['currentlyReading',{'title':'Currently Reading','books': new Map()}],
      ['wantToRead',{'title':'Want to Read','books': new Map()}],
      ['read',{'title':'Read','books':new Map()}]
    ]),
    books : new Map()
  };

  componentDidMount(){
    const shelfs=this.state.shelfs;
    const myBooks=this.state.books;
    BooksAPI.getAll()
    .then(books =>{
      books.forEach(book => {
        shelfs.get(book.shelf).books.set(book.id,null);
        myBooks.set(book.id,book);
      });
      this.setState({
        shelfs:shelfs,
        books:myBooks
      });
    });
  }

  onUpdateBookShelf = (event,book) => {
    event.target.value === 'none' ? this.deleteBook(book):this.updateBook(book,event.target.value);

    BooksAPI.update(book,event.target.value);
  }

  updateBook = (book,new_shelf) =>{
    this.setState(currentState =>{
      if (book.shelf!=='none'){
        currentState.shelfs.get(book.shelf).books.delete(book.id);
        currentState.books.get(book.id).shelf=new_shelf;
      }else{
        book.shelf=new_shelf;
        currentState.books.set(book.id,book);
      }
      currentState.shelfs.get(new_shelf).books.set(book.id,null);
      return {
        shelfs : currentState.shelfs,
        books : currentState.books
      };
    });
  };

  deleteBook = (book) =>{
    this.setState(currentState => {
      currentState.shelfs.get(book.shelf).books.delete(book.id);
      currentState.books.delete(book.id);
      return {
        shelfs : currentState.shelfs,
        books : currentState.books
      };
    });
  };

  shelfCreator= () =>{
    const shelfIterator =this.state.shelfs.entries();
    let res = shelfIterator.next();
    const arr = [];
    while(!res.done){
      arr.push(<ListBooks shelf={res.value[1]} key={res.value[0]} books={this.state.books} onUpdateBookShelf={this.onUpdateBookShelf}/>);
      res=shelfIterator.next();
    }
    return arr;
  }
  
  render(){
    return(
      <div>
        <Route exact path='/' render={()=> (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.shelfCreator()}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() =>(
          <SearchBooks myBooks={this.state.books} onUpdateBookShelf={this.onUpdateBookShelf}/>
        )}/>
      </div>
    );
  }
}

ListBooks.propTypes = {
  shelf : PropTypes.object.isRequired,
  key : PropTypes.string.isRequired,
  onUpdateBookShelf : PropTypes.func.isRequired
}

SearchBooks.propTypes = {
  myBooks : PropTypes.object.isRequired,
  onUpdateBookShelf : PropTypes.func.isRequired
}

export default BooksApp
