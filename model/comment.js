const mongoose = require("mongoose");


const schemaComment = new mongoose.Schema(
    {
        task: {type:String },
        timescale: {type:String },
        when: { type: String }
        
    }
)

const Comment = mongoose.model("Comment", schemaComment);

module.exports = Comment;