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
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/email", emailRoute);

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/', (req, res) => {
    res.send('welcome to homepage')
})


app.listen(PORT, () => {
    console.log('backend sever is running!');
})