const Book = require('../Model/book'); // importing the model book for usage

exports.getAllBooks = async (req, res) => { // exporting the getAllBooks function for usage in other file
    try {
        // console.log("sadasd");
        const limit = parseInt(req.query.limit, 10) || 10;// requesting the limit of records per page 
        const page = parseInt(req.query.page, 10) || 1;// requesting for current page of book should show 
        const offset = (page - 1) * limit;// finding the how many record should skip before fetching the data 
        
        // Fetch books with pagination and count total records
        const { count, rows } = await Book.findAndCountAll({ // finding the number of books(rows),array of fetched records
            limit: limit, // limit taken from user
            offset: offset// skips calculated from current page
        });

        return res.status(200).json({ // sending the response of total books(rows), with all books, page and limit
            books: rows,
            total: count,
            totalPages:Math.ceil(count/limit)
        });
    } catch (error) {
        console.error('Error fetching books:', error.message);  
        return res.status(500).json({ error: 'Internal Server Error' });// HTTP method of 500 which happen when server does not able to repond for response
    }
};


exports.postAllBooks = async (req, res) => { // exporting the postAllbooks function for usage in other file
    try {
        const { id, title, subjects, bookshelves, language } = req.body;// accepting the data send by the user(tittle,subjects,bookshelves,..)
        
        if (!id|| !title || !subjects || !bookshelves || !language) {// checking whether all required are not empty
            return res.status(400).json({ message: 'All fields are required' });//if empty then send message to user
        }

        // Create a new book record
        const newBook = await Book.create({// saving the record send by the user in newBook variable 
            id,
            title,
            subjects,
            bookshelves,
            language
        });

        return res.status(201).json({// send the response of succesfull addition of book
            message: 'Book added successfully',
            book: newBook
        });
    } catch (error) {
        console.error('Error adding book:', error.message);  
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
