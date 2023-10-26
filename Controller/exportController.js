const fastCsv = require('fast-csv');
const fs = require('fs');
const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const Logger = require('../services/loggerService');

const ws = fs.createWriteStream('books.csv');

const logger = new Logger('exportController');
exports.exportBooks = async (req, res) => {
  try {
    const bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    const result = await dbConnection.dbQuery(bookListQuery);
    logger.info(`Return Book List:`, result.rows);
    const data = JSON.parse(JSON.stringify(result.rows));
    fastCsv
      .write(data, { headers: true })
      .on('end', () => {
        console.log('Write to books.csv succesffully');
        res.download('books.csv', function() {
          console.log('file downloaded successfully');
        });
      })
      .pipe(ws);

    // return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log(`Fail to get books ,, Error:${err}`);

    return res.status(500).send({ error: `Failed to get books ${err}` });
  }
};
