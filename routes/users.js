const router = require("express").Router();
const User = require("../models/User");
const bycrpt = require("bcrypt");


router.get('/', (req, res) =>{
    res.send('welcome to user homepage')
})


router.post('/:email', async(req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        const [password, createdAt, updatedAt, ...others] = user;
        if(user) res.status(200).json(user);
        if(!user) res.status(404).json('user not found');

    }catch(error){
        res.status(500).json(error);
    }

});
module.exports = router; 