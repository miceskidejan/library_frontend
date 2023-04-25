import './App.css';
import React, {Component} from "react";
import Books from "../Books/books";
import LibraryService from "../../repository/libraryRepository";
import { createBrowserHistory } from 'history';
import Countries from "../Countries/countries";
import Authors from "../Authors/authors";
import Header from "../Header/header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Routes } from 'react-router-dom';
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";


class App extends Component{

    constructor(props) {
        super(props);
        this.state={
            books: [],
            authors:[],
            countries:[],
            selectedBook:{}
        }
    }

    render() {
        return(
            <Router>

                {/*<Route path={"/books"} element={<Books books={this.state.books}/>}/>*/}
                {/*<Route path={"/authors"} element={<Authors authors={this.state.authors}/>}/>*/}
                {/*<Route path={"/countries"} element={<Countries countries={this.state.countries}/>}/>*/}
                <main>
                    <Header/>
                    <div className="container">
                        <Routes>
                            <Route path={"/books/add"} element={<BookAdd authors={this.state.authors}
                                                                         onAddBook={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"} element={<BookEdit authors={this.state.authors}
                                                                               onEditBook={this.editBook}
                                                                               book={this.state.selectedBook}/>}/>
                            <Route path={"/books"} element={<Books books={this.state.books}
                                                                   onDelete={this.deleteBook}
                                                                   onBorrow={this.borrowBook}
                                                                   onEdit={this.getBook}/>}/>
                            <Route path={"/authors"} element={<Authors authors={this.state.authors}/>}/>
                            <Route path={"/countries"} element={<Countries countries={this.state.countries}/>}/>
                        </Routes>

                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCountries();
        this.loadAuthors();
    }

    loadBooks = ()=> {
        LibraryService.fetchBooks()
            .then((data) => {
              this.setState({
                    books: data.data
              })
            });
        }

    loadAuthors = ()=> {
        LibraryService.fetchAuthors()
            .then((data)=>{
                this.setState({
                    authors: data.data
                })
            });
    }

    loadCountries = ()=> {
        LibraryService.fetchCountries()
            .then((data)=>{
                this.setState({
                    countries: data.data
                })
            });
    }

    deleteBook = (id)=>{
        LibraryService.deleteBook(id)
            .then(()=>{
                this.loadBooks();
            });
    }

    borrowBook = (id)=>{
        LibraryService.borrowBook(id)
            .then(()=>{
                this.loadBooks();
            });
    }

    addBook = (name,authorId,category,availableCopies)=>{
        LibraryService.addBook(name,authorId,category,availableCopies)
            .then(()=>{
                this.loadBooks();
            });
    }

    getBook = (id) =>{
        LibraryService.getBook(id)
            .then((data)=>{
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name,authorId,category,availableCopies) =>{
        LibraryService.editBook(id, name,authorId,category,availableCopies)
            .then(()=>{
            this.loadBooks();
        });
    }

}

export default App;
