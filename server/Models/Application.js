const mongoose = require("mongoose");

const donationAppSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    contactDetails: {
      name: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true 
      },
      phone: { 
        type: String, 
        required: true 
      },
      address: { 
        type: String, 
        required: true 
      },
  },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    detailsOfLoss: {
        type: String,
        required: true
    },
    proofs: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }],
    location: {
        type: String,
        required: true
    },
    compensationAmount: {
        type: Number,
        required: true
    },
    bankDetails: {
      bankName: { 
        type: String, 
        required: true 
      },
      accountNumber: { 
        type: String, 
        required: true 
      },
      accountHolderName: { 
        type: String, 
        required: true 
      },
    },
    typeOfDisaster:{
        type: String,
        required: true,
    },
    dateOfDisaster:{
        type: Date,
        required: true,
    },
    checkBox:{
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvalDate: {
        type: Date,
        default: null 
      },
    deadline: {
        type: Date,
        default: null 
      },
    review: {
        type: Boolean,
        default: false, 
      },
    numberDonations:{
      type: Number,
      default: 0,
    },
    remainingAmount:{
      type: Number,
      default: function() {
        return this.compensationAmount;
    },
  },
    createdAt: {
        type: Date,
        default: Date.now,
    }   
});

const AppDonation = mongoose.model("donationApp",donationAppSchema);
module.exports = AppDonation;