const usermodel = require('../model/user');
const uploadOnCloudinary = require('../utils/cloudinary');

const register = async (req, res) => {

    try {

        const { firstName, lastName, email, department, designation, doj, salary } = req.body;

        let path = req.file && req.file.path

        console.log(path)

        const user = await usermodel.findOne({ email: email });

        if (user) {
            return res.json({
                message: "User already exists",
            })
        }

        const profileHandle = path && await uploadOnCloudinary(path);

        console.log(profileHandle ? profileHandle.url + "prhn" : "No file uploaded")

        const newUser = { firstName, lastName, email, department, designation, doj, salary, profile: profileHandle ? profileHandle.url : null }
        await usermodel.create(newUser);

        res.status(201).json({
            message: "User registered successfully",
            data: newUser,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong at register",
            success: false
        })
    }
}

const updateUser = async (req, res) => {

    try {

        const { firstName, lastName, email, department, designation, doj, salary, } = req.body;

        console.log(req.file);
        let path = req.file && req.file.path

        const user = await usermodel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "No Email Found to refer"
            })
        }

        const profileHandle = path && await uploadOnCloudinary(path);

        const updateData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(department && { department }),
            ...(designation && { designation }),
            ...(salary && { salary }),
            ...(doj && { doj }),
            ...(profileHandle && { profile: profileHandle.url })
        };

        const updatedUser = await usermodel.findOneAndUpdate(
            { email: email },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            message: "User information updated successfully",
            data: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong at updating user information line 78",
            sucess: false
        })
        console.log("Something went wrong at updating user information");

    }
}

const deleteUser = async (req, res) => {

    const { email } = req.body
    const user = await usermodel.findOneAndDelete({ email: email })

    if (!user) {
        return res.status(500).json({
            message: "Worng information provided"
        })
    }
    res.json({
        message: "User removed successfully"
    })

}

const getAllUsers = async (req, res) => {
    const allusers = await usermodel.find();
    res.json({
        message: "All users fetched",
        data: allusers
    })
}

const searchUsers = async (req, res) => {

    const { firstName, lastName, department, designation, doj } = req.body;

    if (firstName) {
        const result = await usermodel.find({ firstName: firstName });
        res.json({
            data: result
        })
    }
    else if (lastName) {
        const result = await usermodel.find({ lastName: lastName });
        res.json({
            data: result
        })
    }
    else if (department) {
        const result = await usermodel.find({ department: department });
        res.json({
            data: result
        })
    }
    else if (designation) {
        const result = await usermodel.find({ designation: designation });
        res.json({
            data: result
        })
    }
    else if (doj) {
        const result = await usermodel.find({ doj: doj });
        res.json({
            data: result
        })
    }


}

const authController = {
    register,
    updateUser,
    deleteUser,
    getAllUsers,
    searchUsers
}
module.exports = authController;