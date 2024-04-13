const doctorApplication = require('../Models/docApplication.js');
const cloudinary = require('cloudinary');
const dataUri = require('../utils/dataUri');
const Admin = require("../Models/admin");

const submitDocApplication = async(req,res)=>{
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
            name: req.body.name,
            email: req.body.email,
            specialization: req.body.specialization,
            lyears: req.body.years,
            consultationFee: req.body.consultationFee,
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