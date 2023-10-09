const queries = require('../db/queries');
const dbConnection = require('../db/connection');
// const util = require('../Util/utility');

exports.getBookList = async (req, res) => {
  try {
    const bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    const result = await dbConnection.dbQuery(bookListQuery);
    console.log(result.rows);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    // console.log('Error:' + err);
    return res.status(500).send({ error: 'Failed to get books' });
  }
};
exports.getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
    // console.log(bookDetailsQuery);
    const result = await dbConnection.dbQuery(bookDetailsQuery, [bookId]);
    // console.log(result.rows[0]);
    return res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (err) {
    console.log('Error:' + err);
    return res.status(500).send({ error: 'Failed to get book details' });
  }
};

exports.saveBook = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date();
    //req.body
    const {
      title,
      description,
      author,
      publisher,
      pages,
      storeCode
    } = req.body;
    // console.log(title, description, author, publisher, pages, storeCode);
    if (!title || !author || !publisher || !storeCode) {
      return res
        .status(500)
        .send({ error: 'title, author, publisher, storeCode are required' });
    }

    const values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdOn,
      createdBy
    ];

    const saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
    await dbConnection.dbQuery(saveBookQuery, values);
    return res.status(201).send('Successfully new book created');
  } catch (err) {
    // console.log('Error:' + err);
    return res.status(500).send({ error: 'failed to add new book' });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date();
    //req.body
    const {
      id,
      title,
      description,
      author,
      publisher,
      pages,
      storeCode
    } = req.body;
    // console.log(title, description, author, publisher, pages, storeCode);
    if (!title || !id || !author || !publisher || !storeCode) {
      return res
        .status(500)
        .send({ error: 'title, author, publisher, storeCode are required' });
    }

    const values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdOn,
      createdBy,
      id
    ];

    const updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
    await dbConnection.dbQuery(updateBookQuery, values);
    return res.status(201).send(`Successfully update book data: ${title}`);
  } catch (err) {
    // console.log('Error:' + err);
    return res
      .status(500)
      .send({ error: `failed to update book data: ${title} ` });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    if (!bookId) {
      return res.status(500).send({ error: 'Cannot delete empty bookId' });
    }
    const deletedBookQuery = queries.queryList.DELETE_BOOK_QUERY;
    await dbConnection.dbQuery(deletedBookQuery, [bookId]);
    return res.status(200).send('Book deleted successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: `Cannot delete with id:${bookId} ` });
  }
};
