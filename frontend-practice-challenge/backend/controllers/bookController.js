const Book = require("../models/Book")


const postAddBook = async (req, res) => {
    const { author, title, description } = req.body;

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
    console.log("hititititititit@@@@@")

    const data = await Book.find({})
    res.json(data)
    console.log(data)

}

module.exports = { postAddBook, getBooks }


