const express = require('express');
const router = express.Router();
const books = require('../../model/books');
const mongoose = require('mongoose'); // Import mongoose
const { Validator } = require('node-input-validator');

router.patch('/update', async function (req, res) {
    try {
        // Validate the request body
        const val = new Validator(req.body, {
            id: "required|string",
            name: "required|string",
            page: "required|string",
            author: "required|string",
        });

        const matched = await val.check();
        if (!matched) {
            return res.status(422).json({
                status: 422,
                error: val.errors,
            });
        }

        // Ensure `id` is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid book ID",
            });
        }

        const bookId = new mongoose.Types.ObjectId(req.body.id);

        // Log inputs for debugging
        console.log("Book ID:", bookId);
        console.log("User ID:", req.user._id);
        console.log("Update Data:", req.body);

        // Perform the update
        const result = await books.updateOne(
            { _id: bookId, create_user_id: req.user._id }, // Query filter
            { 
                $set: {
                    name: req.body.name,
                    page: req.body.page,
                    author: req.body.author, // Updating the author field
                }
            } // Update data
        );

        console.log("Update Result:", result);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                status: 404,
                message: "Book not found",
            });
        } else if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: 400,
                message: "No changes were made",
            });
        } else {
            return res.status(200).json({
                status: 200,
                message: "Updated Successfully",
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err.message,
        });
    }
});

module.exports = router;
