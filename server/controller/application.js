const Application = require('../Models/Application');
const cloudinary = require('cloudinary');
const dataUri = require('../utils/dataUri');
const Admin = require("../Models/admin");
const { deleteModel } = require('mongoose');
const submitApplication = async(req,res)=>{
    try{
        console.log(req.body);
        const userId = req.user._id;
        console.log(userId);
        const file = req.file;
        console.log(file);
        const dataUriFile = dataUri(file);
        const result = await cloudinary.v2.uploader.upload(dataUriFile.content);
        const newApplication = await Application.create({
            user: userId,
            contactDetails: req.body.contactDetails,
            dateOfBirth: req.body.dateOfBirth,
            detailsOfLoss: req.body.detailsOfLoss,
            location: req.body.location,
            compensationAmount: req.body.compensationAmount,
            bankDetails: req.body.bankDetails,
            typeOfDisaster: req.body.typeOfDisaster,
            dateOfDisaster: req.body.dateOfDisaster,
            checkBox: req.body.checkBox,
            proofs: {
                public_id: result.public_id,
                url: result.secure_url,
                // public_id: "1234",
                // url:"xyz",
            },
            status: 'pending',
            createdAt: new Date(),
      });
      console.log('New Application:', newApplication);
      const emails=['jiya@gmail.com','charvig23@gmail.com']
      const admin = await Admin.findOne({ email:{$in:emails} });
        if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
        }
        admin.DonApplications.push(newApplication._id);
        await admin.save();
        res.status(201).json({
            success:true,
            message: "Application submitted successfully",
            data: newApplication,
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message: "Application could not be submitted",
            error: error.message,
        });
    }
}

// <--GET APPLICATIONS--> --Admin

const getApplication = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json({
            success: true,
            message: "Applications fetched successfully",
            data: applications,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Applications could not be fetched",
            error: error.message,
        });
    }
};

// <--UPDATE APPLICATION--> --Admin
// admin is allowed only to update the status of the application
const updateApplication = async (req, res, next) => {
    try {
        const allowedFieldsToUpdate = { status: req.body.status , review: req.body.review};
        let application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found',
            });
        }

        application = await Application.findByIdAndUpdate(
            req.params.id,
            allowedFieldsToUpdate,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        if (req.body.status === 'approved') {
            application.deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }

        await application.save();

        res.status(200).json({
            success: true,
            message: 'Application updated successfully',
            data: application,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Application could not be updated',
            error: error.message,
        });
    }
};

const getReviewedApplications = async (req, res) => {
    try {
        const reviewedApplications = await Application.find({ review: true });
        res.status(200).json({ success: true, data: reviewedApplications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching reviewed applications' });
    }
};

const getApprovedApplications = async (req, res) => {
    try {
        const approvedApplications = await Application.find({ review: true , status: 'approved' });
        res.status(200).json({ success: true, data: approvedApplications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching approved applications' });
    }

}

const getApplicationById =  async (req, res) => {
    try {
      const applicationId = req.params.id;
      const application = await Application.findById(applicationId);
  
      if (!application) {
        return res.status(404).json({
          success: false,
          message: 'Application not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Application details fetched successfully',
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  };

const confirmDonation = async(req,res) => {
    try {
        const application = await Application.findById(req.params.id);
    
        if (!application) {
          return res.status(404).json({ error: 'Application not found' });
        }

        application.numberDonations += 1;
        application.remainingAmount -= req.body.donationAmount;
    
        await application.save();
        res.json({ success: true, message: 'Donation confirmed successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }    
};

const deleteApplication = async(req,res) =>{
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Deletion Successful"});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching approved applications' });
    }
}

module.exports = {submitApplication,getApplication,updateApplication,getApplicationById,getReviewedApplications,getApprovedApplications, confirmDonation,deleteApplication};