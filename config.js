//  module.exports = {
//   mongoURI: "mongodb://Victor:Momentum1992@ds225308.mlab.com:25308/lacapsule_alumni_profiles"
// };

// mongoURI: "mongodb://flobady:flobadypassword@ds225308.mlab.com:25308/lacapsule-alumni_dev"
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: process.env.MONGO_URI,
  };
} else {
  module.exports = require('./key');
}
