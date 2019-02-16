
const express = require('express');
const router = express.Router();


const User = require('../models/user');
const Paper = require('../models/Paper');
router.post('/user', (req, res) => {
    User.create((req.body), (err, res) => {
        console.log(req.body);
        if (err) {
            return ({ success: false, message: `Failed to add the user. Error: ${err}` });
        }
        else {
            return ({ success: true });
        }
    });

});

router.get('/getuser/:id', (req, res) => {
    console.log("here");
    console.log(req.params.id);
    User.findById(req.params.id, (err, user) => {
        if (user) {
            console.log(user.transactions);
            if (user.leagues.length > 5) {
                user.leagues.slice(0, 5);
            }
            return res.json({ success: true, user: user });
        } else {
            return res.json({ success: false });
        }
    }

    );
});
router.post('/login', (req, res) => {

    User.findOne(
        {
            email: req.body.email
        }, (err, user) => {
            if (err) {

                return res.json({ success: false, message: `Technical error.` });

            }
            else if (!user) {

                return res.json({ success: false, message: 'user not found' });
            }
            else {
                if (user.password != req.body.password) {
                    return res.json({ success: false, message: 'wrong password' });
                } else {
                    user.save();
                    return res.json({ success: true, user: user });
                }
            }

        });

});
router.post('/checkPassAndChange', (req, res) => {
    User.findOne({ password: req.body.password }, { id: req.body.id }, (err, user) => {
        if (!user) {

            return res.json({ status: false, message: `Failed to check password. Error` });

        }
        else {

            user.password = req.body.newpassword;
            user.save();
            return res.json({ status: true });

        }

    });
});
router.post('/signup', (req, res) => {

    User.create(req.body, (err, user) => {
        console.log(req.body);
        if (err) {
            console.log(err);
            return res.json({ success: false, message: `Failed to signin. Error: ${err}` });

        }
        else {
            return res.json({ success: true, user: user });
        }
    }

    );

});

router.get('/getPapers/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.json({ success: false, message: `Failed to load User. Error: ${err}` });
        }
        else {
            papers = user.papers;
            let result;
            async.each(
                papers,
                function (paper, callback) {
                    Paper.findById(paper._id, function (
                        err,
                        paperDesc
                    ) {
                        if (paperDesc) {
                            result.push(paperDesc);
                        }
                        callback();
                    });
                },
                function (err) {
                    return res.json(result);
                });
        }
    });
});

module.exports = router;