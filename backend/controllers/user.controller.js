const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDataUri = require('../utils/datauri');
const cloudinary  = require('../utils/cloudinary');

exports.register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: 'Something is missing', success: false });
        }

        const user = await User.findOne({ email }); // ✅ FIXED
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({ message: 'Account created successfully', success: true });
    } catch (err) {
        console.log(`Error at registerUser controller: ${err}`);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Something is missing', success: false });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Incorrect email or password', success: false });
        }

        // ✅ FIXED: Corrected the role check
        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with this role", success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }) // ✅ FIXED: `httpOnly`
            .json({ message: `Welcome back ${user.fullname}`, user, success: true });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie('token', "", { maxAge: 0 })
            .json({ message: 'Logged out successfully.', success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Cloudinary setup will be added later
        const fileUri  = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }

        const userId = req.user ? req.user.id : req.id; // ✅ FIXED: Ensure `req.user.id` is available

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillsArray) user.profile.skills = skillsArray

        // Resume handling will be added later
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOrignalName = file.originalname;
        }
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({ message: 'Profile updated successfully.', user, success: true });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
