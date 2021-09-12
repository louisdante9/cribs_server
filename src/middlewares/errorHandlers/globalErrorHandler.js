module.exports = (err, req, res, next) => {
  if (err.code) {
    return res.status(err.code).json(err);
  }

  if (!err.code) {
    return res.status(500).json({
      code: 500,
      type: 'ServerErrror',
      name: 'ServerErrrorEception',
      message: err.message,
    });
  }

  next();
};
