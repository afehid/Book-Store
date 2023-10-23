// const bcrypt = require('bcryptjs');

const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const Logger = require('../services/loggerService');
const validationUtil = require('../Util/validation');
const AppError = require('../Util/appError');
const jwtUtil = require('../Util/jwtUtil');

const logger = new Logger('userController');

exports.getUserProfile = async (req, res) => {
  //   const user = req.user;
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.log(`err:${err}`);
    return res.status(500).send({ error: 'Failed to get user' });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    /** 1- validate is not empty
     * 2- get user by username
     * 3- compare password
     * 4- generate token
     * 5- get user roles
     */
    if (!username || !password)
      return new AppError('Username and Password are required', 404);
    const loginQuery = queries.queryList.LOGIN_QUERY;
    const result = await dbConnection.dbQuery(loginQuery, [username]);
    console.log(result.rows[0]);
    const dbResponse = result.rows[0];
    if (dbResponse === null) {
      logger.info(`user: ${username} not exists`);
      return new AppError('Not exist Userr', 500);
    }
    // console.log(dbResponse, username);
    const isPasswordValid = validationUtil.comparePassword(
      password,
      dbResponse.password
    );
    // console.log(password, dbResponse.password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      logger.info(`Invalid Password for user:  ${username}`);
      return new AppError('Invalid Password', 500);
    }

    const userRoles = await this.getUserRoles(dbResponse.user_id, req, res);
    const token = jwtUtil.generateToken(
      dbResponse.user_id,
      dbResponse.username,
      dbResponse.email,
      dbResponse.user_type_code,
      dbResponse.full_name,
      userRoles
    );
    return res.status(200).json({ token });
  } catch (error) {
    logger.error(`Failed to signIn, Invalid Username or Password ${error}`);
    return new AppError(`Failed to Signin, Invalid Username or Password`, 500);
  }
};

// eslint-disable-next-line no-unused-vars
exports.getUserRoles = async userId => {
  try {
    
    const userRoles = 'admin';
    return userRoles;
  } catch (error) {
    return new AppError('failed to get user roles', 401);
  }
};
