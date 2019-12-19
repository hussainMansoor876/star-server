const express = require('express');
const app = express();

const mongoose = require('./config/db')

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', function() {
    console.log('DB chal gya')
  });

app.listen(5000,()=>{
    console.log('Server Chal Gya...!')
})

app.use(express.json());

app.use('/',require('./routes/index'))

// app.get('/user',(request,response) =>{
//     console.log(request.query)
//     response.send({name: 'Mansoor',email:'hussain@gmail.com'})
// })

// app.post('/get',(request,response) =>{
//     console.log('Yeh User Hai')
//     response.send({name: 'Mansoor',email:'hussain@gmail.com'})
// })