const Book = require("../models/Book")

const postBooks = async (req, res) => {
    const { author, title, description } = req.body
    try {
        const newBook = new Book({
            author: author,
            title: title,
            description: description
        })

        await newBook.save()
    } catch (error) {
        console.log(error)
    }
}

const getBooks = async (req, res) => {
    const data = await Book.find({})
    res.json(data)
}

module.exports = { postBooks, getBooks }