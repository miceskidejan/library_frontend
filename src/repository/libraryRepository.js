import axios from "../custom-axios/axios";

const LibraryService={
    fetchBooks: ()=>{
        return axios.get("/books");
    },
    fetchAuthors: ()=>{
        return axios.get("/authors");
    },
    fetchCountries: ()=>{
        return axios.get("/countries");
    },
    deleteBook: (id)=>{
        return axios.delete(`/books/delete/${id}`);
    },
    borrowBook: (id)=>{
        return axios.put(`/books/borrow/${id}`);
    },
    addBook: (name,authorId,category,availableCopies)=>{
        return axios.post("/books/add",{
            "name":name,
            "authorId":authorId,
            "category":category,
            "availableCopies":availableCopies
        });
    },
    editBook: (id, name,authorId,category,availableCopies)=>{
        return axios.put(`/books/edit/${id}`,{
            "name":name,
            "authorId":authorId,
            "category":category,
            "availableCopies":availableCopies
        });
    },
    getBook: (id) =>{
        return axios.get(`/books/${id}`);
    }
}

export default LibraryService;