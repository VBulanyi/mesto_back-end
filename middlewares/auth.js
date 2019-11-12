const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    payload = jwt.verify(token, 'ea13ca6b585b3862cb0c9a68d5eb5a1f1271747ddc0f5aa3d9232688b3572dbb');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = { _id: payload._id };
  next();
};
