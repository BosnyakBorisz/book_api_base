const getBooksMW = require('../middleware/getBooks');
const getBookMW = require('../middleware/getBook');
const createBookMW = require('../middleware/createBook');
const deleteBookMW = require('../middleware/deleteBook');
const updateBookMW = require('../middleware/updateBook');
const searchMW = require('../middleware/search');


function addRoutes(app) {
    //let globalId = 5;

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
        nextId : 5
    }

    app.get('/book', getBooksMW(objRep));
    app.post('/book', createBookMW(objRep));
    app.get('/book/:id', getBookMW(objRep), (req, res, next) => {
        return res.status(200).json(books[res.locals.bookId]);
    });
    app.delete('/book/:id', getBookMW(objRep), deleteBookMW(objRep));
    app.patch('/book/:id', getBookMW(objRep), updateBookMW(objRep));
    app.post('/search', searchMW(objRep));


}
module.exports = addRoutes;