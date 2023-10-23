const bcrypt = require('bcryptjs');

const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const util = require('../Util/utility');
const Logger = require('../services/loggerService');
const auditService = require('../Audit/auditService');
const auditAction = require('../Audit/auditAction');
const validationUtil = require('../Util/validation');

const logger = new Logger('userController');
const auditOn = util.dateFormat();

exports.getUserList = async (req, res) => {
  try {
    const userListQuery = queries.queryList.GET_USER_LIST_QUERY;
    const result = await dbConnection.dbQuery(userListQuery);
    logger.info(`Return User List:`, result.rows);
    // console.log(result.rows);
    auditService.prepareAudit(
      auditAction.getBookList.GET_USER_LIST,
      result.rows,
      null,
      'postman',
      auditOn
    );
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log(err, `Fail to get user ,, Error:${err}`);
    // logger.error('Failed to get User Details', JSON.stringify(err));
    auditService.prepareAudit(
      auditAction.getBookList.GET_USER_LIST,
      null,
      JSON.stringify(err),
      'postman',
      auditOn
    );
    return res.status(500).send({ error: `Failed to get Users ${err}` });
  }
};

exports.saveUser = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date();
    //req.body
    const {
      username,
      password,
      email,
      userTypeCode,
      fullName
      // groups
    } = req.body;
    // console.log(username, password, email, userTypeCode, fullName);
    if (
      !username ||
      !password ||
      !email ||
      !userTypeCode ||
      !fullName
      // !groups
    ) {
      return res.status(500).send({
        error:
          'username, password, email, userTypeCode, fullName, selected groups are required'
      });
    }

    const isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
    const result = await dbConnection.dbQuery(isUserExistsQuery, [
      username,
      email
    ]);
    console.log(`Result: ${JSON.stringify(result)}`);
    console.log(result.rows[0]);
    if (result.rows[0].count !== '0')
      return res.status(500).send({ error: 'User already Exists' });

    if (!validationUtil.isValidEmail(email))
      return res.status(500).send({ error: 'Email is not valid' });

    if (!validationUtil.isValidPassword(password))
      return res.status(500).send({ error: 'Password is not valid' });

    //everything is OK
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [
      username,
      hashedPassword,
      email,
      userTypeCode,
      fullName,
      createdOn,
      createdBy
    ];

    const saveUserQuery = queries.queryList.SAVE_USER_QUERY;
    await dbConnection.dbQuery(saveUserQuery, values);
    return res
      .status(201)
      .send(`Successfully new User created ${saveUserQuery}`);
  } catch (err) {
    // console.log('Error:' + err);
    return res.status(500).send({ error: 'failed to add new User' });
  }
};
