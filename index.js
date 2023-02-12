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
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    rossOriginResourcePolicy: false,
}));
app.use(morgan("common"));

// Add headers before the routes are defined
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/email", emailRoute);

//app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content-Type,Accept'
    );
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

app.get('/', (req, res) => {
    res.send('welcome to homepage')
})


app.listen(PORT, () => {
    console.log('backend sever is running!');
})