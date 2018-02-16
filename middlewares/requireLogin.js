module.exports = (req, res, next) => {
  if(!req.session.user){res.status(401).send({ error: 'You must log in'})} 
  next();
};
