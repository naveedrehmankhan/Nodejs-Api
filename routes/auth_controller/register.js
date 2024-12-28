const express = require('express');
const router = express.Router();
const { Validator } = require('node-input-validator');
const Users = require('../../model/users');

router.post('/', async function (req, res) {

    try {
        const val = new Validator(req.body, {
            email: "required|email",
            password: "required",
            name: "required|string",
            age: "required|string",
        });
        const matched = await val.check();
        if (!matched) { 

            return res.status(422).json({
                status: 422,
                error: val.errors,
            })
        } else {

            const isUSerExist = await Users.exists({
                email: req.body.email,
            });
            if (isUSerExist) {

                return res.status(405).json({
                    status: 405,
                    message: "User ALready Exists",
                });

            } else {
                Users.create({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    age: req.body.age,
                    status: 1,
                    date: Date.now(),

                });
                return res.status(200).json({
                    status: 200,
                    message: "User Created",
                });
            }

        }

    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "internal error",
            error: error.message,
        });

    }

});


module.exports = router;
