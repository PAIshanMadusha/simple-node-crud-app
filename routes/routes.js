const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const users = require("../models/users");
const fs = require("fs");
const { type } = require("os");

//Image Upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb(null, file.filename+"_"+Date.now()+"_"+file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single('image');

//Insert an User into Database Route
router.post('/add', upload, async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });

        await user.save(); // Use async/await instead of callbacks

        req.session.message = {
            type: 'success',
            message: 'User Added Successfully!'
        };

        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

// Get All Users Route
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Use async/await instead of .exec()
        res.render("index", {
            title: "Home Page",
            users: users,
            message: res.locals.message, // Pass message
        });

        req.session.message = null; // Clear after displaying
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.get("/add", (req, res) => {
    res.render("add_users", { title: "Add Users" });
});

//Edit an User Route
router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id); // Use await instead of a callback
        if (!user) {
            return res.redirect('/');
        }
        res.render('edit_users', {
            title: 'Edit User',
            user: user,
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

//Update User Route
router.post('/update/:id', upload, async (req, res) => {
    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;

        try {
            fs.unlinkSync('./uploads/' + req.body.old_image); // Remove old image
        } catch (err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }

    try {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        });

        req.session.message = {
            type: 'success',
            message: 'User Updated Successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.json({ message: err.message, type: 'danger' });
    }
});

//Delete User Route
router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findByIdAndDelete(id); // Await the deletion

        if (user && user.image) { // Check if user exists and has an image
            try {
                fs.unlinkSync('./uploads/' + user.image); // Delete the image file
            } catch (err) {
                console.log(err);
            }
        }

        req.session.message = {
            type: 'info',
            message: 'User Deleted Successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    }
});

// About Page Route
router.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

//Contact Page Route
router.get("/contact", (req, res) => {
    res.render("contact", {title: "Contact" });
})

router.post("/contact", (req, res) => {
    console.log("Contact Form Submitted:", req.body);
    req.session.message = {
        type: 'success',
        message: 'Your Message has been Sent successfully!'
    };
    res.redirect("/contact");
});

module.exports = router;