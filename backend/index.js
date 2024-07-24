const express = require('express')
const app = express();
const connectDB = require('./db')
const cors = require('cors');


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/store',require('./routes/store'));
// app.use('/api/rating',require('./routes/rating'));


app.get('/',(req,res)=>{
    res.send("Welcome to Store Rating");
});

app.listen(5000,()=>{
    console.log(`Server is listening on http://localhost:5000/`);
})