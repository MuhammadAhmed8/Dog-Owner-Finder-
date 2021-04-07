const mongoose = require('mongoose');
const m2s = require('mongoose-to-swagger');
const Cat = mongoose.model('Pet', { name: String });
const swaggerSchema = m2s(Cat);
console.log(swaggerSchema);
