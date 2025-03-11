module.exports = (req, res, next) => {
  if (req.userData && req.userData.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Access denied! Admin role required." });
  }
};