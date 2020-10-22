const mongoose = require('mongoose');
const URI = 'mongodb://localhost/anuncios';

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false})
    .then(res => console.log('DB is connected.'))
    .catch(err => console.log(err));

module.export = mongoose;