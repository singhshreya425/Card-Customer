const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
    {
        cardNumber: {
            type: String,
            required: true,
            trim: true
        },
        cardType: {
            type: String,
            required: true,
            enum: ["REGULAR" , "SPECIAL"]
        },
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["ACTIVE" , "INACTIVE"],
            default: "ACTIVE"
        },
        vision: {
            type: String,
            trim: true
        },
        customerID: {
            type: String,
            ref: "customer",
            require: true
        }
    }
)

module.exports = mongoose.model("card", cardSchema)