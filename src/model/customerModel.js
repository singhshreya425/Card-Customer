const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        mobileNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        DOB: {
            type: Date,
            required: true,
            trim: true
        },
        emailID: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        customerID: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            trim: true
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("customer", customerSchema)
