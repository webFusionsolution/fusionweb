const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const bycrpt = require("bcrypt");


router.get('/', (req, res) => {
    res.send('welcome to user homepage')
})


router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const {password, _id, username, isAdmin, createdAt, updatedAt, __v, ...rest} = user._doc;
        if (user) res.status(200).json(rest);
        if (!user) res.status(404).json('user not found');

    } catch (error) {
        res.status(500).json(error);
    }

});

router.post('/contact', async (req, res) => {
    try {
        const user = await Contact.findOne({ email: req.body.email });
        if (!user) {
            const newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
            });
            // save new contact
            const contact = await newContact.save();
            res.status(200).json(contact);
        } else {
            res.status(400).json("You query is already being process");
        }        

    } catch (error) {
        res.status(500).json('error');
    }
});

module.exports = router; 