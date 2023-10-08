const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const util = require('../Util/utility');

exports.getStoreList = async (req, res) => {
  try {
    const storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
    const result = await dbConnection.dbQuery(storeListQuery);
    console.log(result.rows);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    // console.log('Error:' + err);
    return res.status(500).send({ error: 'Failed to list store' });
  }
};

exports.saveStore = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date();
    //req.body
    const { storeName, address } = req.body;
    console.log(storeName, address);
    if (!storeName || !address) {
      return res
        .status(500)
        .send({ error: 'store name and address are required' });
    }

    const storeCode = util.generateStoreCode();

    const values = [storeName, storeCode, address, createdBy, createdOn];
    const saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
    await dbConnection.dbQuery(saveStoreQuery, values);
    return res.status(201).send('Successfully store created');
  } catch (err) {
    // console.log('Error:' + err);
    return res.status(500).send({ error: 'failed to save store' });
  }
};
