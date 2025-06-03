import { createUser , loginUser , getAllUser} from '../services/user.service.js';

export const registerUserController = async(req, res) => {
   try {
    const {username , password , first_name , last_name , location , description , occupation} = req.body;
    const user = await createUser({username , password , first_name , last_name , location , description , occupation});
    res.status(201).json({
        success : true,
        message : "User created successfully",
        data : user,
    });
   } catch (error) {
    res.status(400).json({
        success : false,
        message : error.message,
    });
   }
}

export const loginUserController = async(req, res) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await loginUser({ username, password });
        // Set token in cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    _id: user._id,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    location: user.location,
                    description: user.description,
                    occupation: user.occupation
                },
                accessToken : token
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const logoutUserController = async(req, res) => {
    try {
        // Check if there's an accessToken in cookies
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "No access token found. User is not logged in."
            });
        }
        // Clear the accessToken cookie
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllUserController = async (req , res) => {
    try {
        const users = await getAllUser();
        res.status(200).json({
            success : true,
            message : "User found success",
            data : users
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message,
        })
    }
}