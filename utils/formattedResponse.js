exports.formattedResponse = (req, res, statusCode, ok, message, data=null) => {
  return res.status(statusCode).json({ ok, message, data });
};
