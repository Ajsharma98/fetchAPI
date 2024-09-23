const router = require('express').Router();
const bookControllers = require('../controllers/booksControllers');
const { verifyToken } = require('../middleware/verifyToken');
const {verifyAdmin}  =require('../middleware/verifyAdmin');


// Route to get all books with optional pagination
router.get('/', verifyToken, bookControllers.getAllBooks);

// Route to add a new book
router.post('/add', verifyToken, verifyAdmin, bookControllers.postAllBooks);

module.exports = router;




