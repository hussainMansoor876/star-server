const express = require('express');
var cors = require('cors')
var fileUpload = require('express-fileupload')
const app = express();

const mongoose = require('./config/db')

const PORT = process.env.PORT || 5001

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB chal gya')
});


app.listen(PORT, () => {
  console.log('Server Chal Gya...!', PORT)
})

app.use(express.json());

// app.use('/', (req, res) => {
//   return res.send({ message: "Working" })
// })

app.use(cors())
app.use(fileUpload({
  useTempFiles: true,
}));
app.use('/', require('./routes/index'))

// app.get('/user',(request,response) =>{
//     console.log(request.query)
//     response.send({name: 'Mansoor',email:'hussain@gmail.com'})
// })

// app.post('/get',(request,response) =>{
//     console.log('Yeh User Hai')
//     console.log(request.files)
//     response.send({name: 'Mansoor',email:'hussain@gmail.com'})
// })