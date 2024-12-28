const express = require('express');
const { Validator } = require('node-input-validator');
const router = express.Router();
const books = require('../../model/books');

router.delete('/delete', async function (req, res) {

    try {
        const val = new Validator(req.body, {
            id: "required|string"
        });
        const matched = await val.check();

        if (!matched) {
            return res.status(422).json({ status: 422, error: val.errors });
        } else {

            // Use findOneAndDelete instead of findOneAndRemove
            const result = await books.findOneAndDelete({
                _id: req.body.id  // Make sure you're passing the correct field here
            });

            if (!result) {
                return res.status(404).json({
                    status: 404,
                    message: "Book not found"
                });
            }

            return res.status(200).json({
                status: 200,
                message: "Book deleted successfully"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
});

module.exports = router;
