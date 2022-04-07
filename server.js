require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const employeeRouter =  require('./src/routes/employee.route');
const postRouter = require('./src/routes/post.route');
const userRouter = require('./src/routes/user.route');

// parse request data content type application/x-www-form-rulencoded 
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// parse request data content type application/json
app.use(bodyParser.json());

const PORT = process.env.APP_PORT || 4000

// Routing
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

app.listen(PORT, () => console.log(`Server ${PORT} is working`))