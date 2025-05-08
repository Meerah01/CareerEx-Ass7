const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    itemName: {type: String, require: true},
    description: {type: String, require: true},
    locationFound: {type: String, default: ""},
    dateFound: {type: Date, default: 0},
    claimed: {type: Boolean, default: false} 
}, { timestamps: true } )

const Item = new mongoose.model("Item", itemSchema)

module.exports = Item 
