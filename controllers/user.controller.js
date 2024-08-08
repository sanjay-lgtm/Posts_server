import { User } from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                sucess: false,
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Try different emails",
                sucess: false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username:username,
            email:email,
            password:hashedPassword,
        })
        if (user) {
            return res.status(201).json({
                message: "Account created successfully",
                sucess: true,
            });
        };
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                sucess: false,
            });
        }


        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Please login with valid email and password",
                sucess: false,
            });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email and password",
                sucess: false,
            });
        };

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: user.posts,
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECREAT_KEY, {
            expiresIn: "1d",
        })
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        });
    } catch (error) {
        console.log(error)
    }
}


export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}


export const getProfile = async (req, res) => {
    try {
        const userId = req.parmas.id;
        let user = await User.findById(userId).select('-password');
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false })

        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();
        return res.status(200).json(
            {
                message: 'Profile updated succewssfully',
                success: true,
                user
            })
    } catch (error) {
        console.log(error)
    }
}


export const getSuggestedUser = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(404).json({
                message: 'No suggested users found',
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        });
    } catch (error) {
        console.log(error)
    }
}

export const followOrUnFollow = async (req, res) => {
    try {
        const followKarneWala = req.id;
        const jiskoFollowKarunga = req.parmas.id;
        if (followKarneWala === jiskoFollowKarunga) {
            return res.status(404).json({
                message: "You can't follow or unfollow yourself",
                success: false,
            })

        }
        const user = await User.findById(followKarneWala);
        const targetUser = await User.findById(jiskoFollowKarunga);
        if (!user || !targetUser) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKarunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKarneWala }, { $pull: { following: jiskoFollowKarunga } }),
                User.updateOne({ _id: jiskoFollowKarunga }, { $pull: { followers: followKarneWala } }),
            ])
            return res.status(200).json({
                message: "Unfollowed successfully",
                success: true
            })

        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKarneWala }, { $push: { following: jiskoFollowKarunga } }),
                User.updateOne({ _id: jiskoFollowKarunga }, { $push: { followers: followKarneWala } }),
            ])
            return res.status(200).json({
                message: "Followed successfully",
                success: true

            })
        }

    } catch (error) {
        console.log(error)
    }
}
