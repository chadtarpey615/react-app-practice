import React, { useState, useEffect } from 'react'
import axios from "axios"
import "../styles/Books.css"
const Books = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadBooks()
        setLoading(false);
        console.log(books)
    }, [])


    const loadBooks = () => {
        axios.get("/api/books")
            .then(res => setBooks(res.data))

        // console.log(data)
    }

    if (loading) {
        return <p>Data is loading....</p>
    }

    if (!loading) {
        return (
            <div className="books">
                <h1>Heres the books we have in stock</h1>

                <div >

                    {books.map(book => (

                        <div className="book-display">

                            <h2>Author: {book.author}</h2>
                            <h3>Title: {book.title}</h3>
                            <h4>Description: {book.description}</h4>
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

export default Books
