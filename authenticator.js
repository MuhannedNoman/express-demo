function Authenticator(req, res, next) {
  console.log('Authenticating....');
  next();
}

module.exports = Authenticator;
