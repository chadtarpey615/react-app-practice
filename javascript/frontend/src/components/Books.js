import React, { useState, useEffect } from "react"
import axios from "axios"
import "../styles/Books.css"




const Books = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        loadBooks()
        setLoading(false)
    }, [])

    const loadBooks = async () => {
        axios.get("/api/books").then(res => setBooks(res.data))
    }
    if (loading) {
        return <h1>Books coming soon</h1>
    }

    if (!loading) {
        return (
            <div className="books">
                <h1>Check out our book inventory</h1>
                {books.map(book => (
                    <>
                        <h2>Author: {book.author}</h2>
                        <h3>Title:</h3> <p>{book.title}</p>
                        <h4>Description: {book.description}</h4>
                    </>
                ))}

            </div>
        )
    }

}

export default Books