const router = require("express").Router();
const User = require("../models/User");
const bycrpt = require("bcrypt");

router.get('/', (req, res) => {
    res.send('welcome to auth homepage')
})

// Register

// router.get('/register', async (req, res) => {
//     const user = new User({
//         username: 'johnTt',
//         email: 'johntt@gmail.com',
//         password: '1234567890'
//     });
//     await user.save();
//     res.send('Okay'); 
// })

// router.post('/register', async (req, res) => {
//     try {
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         });
//         const user = await newUser.save();
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json(error);
//     }


// });
router.post('/register', async(req, res) =>{

    try{
        // generate new password
        const salt = await bycrpt.genSalt(10);
        const hashPassword = await bycrpt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        // save new user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(error){
       // res.status(500).json(error);
    }

})

// // Login 
router.post('/login', async(req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) res.status(404).json('user not found');

        const validPassword = await bycrpt.compare(req.body.password, user.password);
        if(!validPassword) res.status(400).json("password incorrect");

        res.status(200).json(user)

    }catch(error){
        //res.status(500).json(error);
    }

});

router.get('/login/:email', async(req, res) =>{
    try{
        const user = await User.findOne({email: req.params['email']});
        console.log(req.params['email'])
        if(!user) res.status(404).json('user not found');

    }catch(error){
        //res.status(500).json(error);
    }

});

module.exports = router; 