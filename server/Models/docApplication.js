const mongoose = require("mongoose");
const DocApplication = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    document:[{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }],
    specialization: {
        type: String,
        required:true,
    },
    years:{
        type: Number,
        required:true,
    },
    consultationFee:{
        type: Number,
        required:true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    review: {
        type: Boolean,
        default: false, 
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }   
});

const DocAppModel = mongoose.model("DocApplication", DocApplication); // 1st argument is name with what we will store the model as, 2nd argument for what schema we are using to build the model

module.exports = DocAppModel;