const uuid = require('uuid');
const getBooksMW = require('../middleware/getBooks');
const getBookMW = require('../middleware/getBook');
const createBookMW = require('../middleware/createBook');
const deleteBookMW = require('../middleware/deleteBook');
const updateBookMW = require('../middleware/updateBook');
const searchMW = require('../middleware/search');


function addRoutes(app, db, bookModel) {
    const books = [
        {
            id: 1,
            title: 'Kis herceg',
            author: 'Herczeg András'
        },{
            id: 2,
            title: 'Második könyv',
            author: 'Második szerző'
        },{
            id: 3,
            title: 'Harmadik könyv',
            author: 'Harmadik szerző'
        },{
            id: 4,
            title: 'Negyedik könyv',
            author: 'Negyedik szerző'
        }
    ]

    const objRep = {
        books, 
        bookModel,
        db,
        uuid
    }

    app.get('/book', getBooksMW(objRep), (req, res, next) => res.json(res.locals.books));
    app.post('/book', createBookMW(objRep), (req, res, next) => res.json(res.locals.book).status(201));
    app.get('/book/:id', getBookMW(objRep), (req, res, next) => res.json(res.locals.book));
    app.delete('/book/:id', getBookMW(objRep), deleteBookMW(objRep), (req, res, next) => res.json(res.locals.book));
    app.patch('/book/:id', getBookMW(objRep), updateBookMW(objRep), (req, res, next) => res.json(res.locals.book));
    app.post('/search', searchMW(objRep), (req, res, next) => res.json(res.locals.books));
}
module.exports = addRoutes;