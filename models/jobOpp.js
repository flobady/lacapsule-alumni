const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobOppSchema = new Schema ({
  postedBy: String,
  email: String,
  password: String,
  Role: { type: String, default: "standard" }
})

mongoose.model('users', userSchema);
