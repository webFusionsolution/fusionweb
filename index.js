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


app.use(cors()); // <---- use cors middleware

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/email", emailRoute);

app.get('/', (req, res) => {
    res.send('welcome to homepage')
})


const server = app.listen(process.env.PORT || 8800, () => {
    const port = server.address().port;
    console.log(`console.log('backend sever is running!'); ${port}`);
});