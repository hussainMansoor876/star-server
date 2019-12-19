const mongoose = require('mongoose');
mongoose.connect('mongodb://mansoor:mansoor11@ds025742.mlab.com:25742/star-rating', {useNewUrlParser: true});

module.exports = mongoose
