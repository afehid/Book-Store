const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AppError = require('../Util/appError');
// const { error } = require('winston');

dotenv.config();

exports.generateToken = (
  userId,
  username,
  email,
  userTypeCode,
  fullname,
  userRoles
) => {
  const token = jwt.sign(
    {
      userId: userId,
      username: username,
      email: email,
      userType: userTypeCode,
      fullname: fullname,
      roles: userRoles
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '3d'
    }
  );

  return token;
};

exports.verifyToken = (...roles) => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      console.log(`token: ${token}`);
      if (!token)
        return next(
          new AppError(
            'You are not logged in!, Please log in to get access',
            401
          )
        );
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(`decode: ${JSON.stringify(decode)})`);
      req.user = {
        userId: decode.userId,
        username: decode.username,
        email: decode.email,
        fullname: decode.fullname,
        roles: decode.roles,
        userType: roles.userType
      };
      if (!roles.includes(decode.roles)) {
        console.log('not have the same role');
        return res.status(401).send({ error: 'authentication faild' });
      }
      console.log('valid Token');
      next();
    } catch (err) {
      console.log(`error logging in via token ${err}`);
      return new AppError(
        'You are not logged in!, Please log in to get access',
        401
      );
    }
  };
};
