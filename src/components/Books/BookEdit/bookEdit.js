import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const BookEdit = (props)=>{

    const navigate = useNavigate();
        const[formData, updateFormData] = useState({
            name:"",
            authorId:0,
            category:"",
            availableCopies:0
        })


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const authorId = formData.authorId !== 0 ? formData.authorId : props.book.author.id;
        const category = formData.category !== "" ? formData.category : props.book.category;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditBook(props.book.id,name,authorId,category,availableCopies);
        navigate("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Authors</label>
                        <select name="authorId" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if(props.book.author !== undefined && props.book.author.id === term.id)
                                    return <option key={term.id} selected={props.book.author.id} value={term.id}>{term.name}</option>
                                else
                                    return <option key={term.id} value={term.id}>{term.name}</option>
                            })}
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text"
                               className="form-control"
                               id="category"
                               name="category"
                               placeholder={props.book.category}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );


}

export default BookEdit;