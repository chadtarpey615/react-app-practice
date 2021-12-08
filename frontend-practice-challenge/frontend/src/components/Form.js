import React, { useState } from 'react'
import axios from "axios"
import "../styles/Form.css"

const Form = () => {
    const [author, setAuthor] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)

    const submitBookHandler = async () => {
        try {
            axios.post("/api/books", {
                author,
                title,
                description
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className="input-form" onSubmit={submitBookHandler}>
            <div className="inputs">
                <h1>Post a new book</h1>
                <label htmlFor="">Author</label>
                <input type="text" placeholder="enter author" onChange={(e) => setAuthor(e.target.value)} />
                <label htmlFor="">Title</label>
                <input type="text" placeholder="enter title" onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="">Description</label>
                <input type="text" placeholder="enter description" onChange={(e) => setDescription(e.target.value)} />
                <button>Submit</button>
            </div>


        </form>
    )
}

export default Form
