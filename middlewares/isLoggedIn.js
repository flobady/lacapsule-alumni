module.exports = (req, res, next) => {
  if(!req.session.user){
    return false
  } else { return true }
};
