module.exports = (req, res, next) => {
  if (!req.query.userId) res.status(402).json({ msg: 'userId not found' });
  else {
    req.userId = req.query.userId;
    next();
  }
};
