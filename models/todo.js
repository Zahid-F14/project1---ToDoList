const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        
    },
    date:{
        type:Date,
        default: Date.now
    }
});
module.exports=mongoose.model('ToDo',todoSchema);