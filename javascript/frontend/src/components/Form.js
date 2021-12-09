import React, { useState } from 'react'
import axios from "axios"
import "../styles/Form.css"
const Form = () => {

    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const submitHandler = async () => {
        await axios.post("/api/books", {
            author,
            title,
            description
        })
    }
    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="inputs">
                <label htmlFor="">Author</label>
                <input type="text" placeholder="Enter author" onChange={(e) => setAuthor(e.target.value)} />
                <label htmlFor="">Title</label>
                <input type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="">Description</label>
                <input type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} />
                <button>Submit</button>

            </div>
        </form>
    )
}

export default Form
