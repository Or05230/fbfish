var mongoose = require("mongoose");

const DetailsSchema = mongoose.Schema({
    email: String,
    password: String
});

module.exports = mongoose.model("Details", DetailsSchema);
