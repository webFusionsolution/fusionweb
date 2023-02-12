const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/email");
const PORT = process.env.PORT || 8800;
const API = process.env.REACT_APP_PROD_API;


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to Mongo db')
});



// Middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', "http://fusionweb.in");

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
    
    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // // Pass to next layer of middleware
    // next();
});

app.use(cors()); // <---- use cors middleware

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/email", emailRoute);

app.get('/', (req, res) => {
    res.send('welcome to homepage')
})


app.listen(PORT, () => {
    console.log('backend sever is running!');
})