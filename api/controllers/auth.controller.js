import User from "../models/user.model.js";
import bcrpytjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username=== "" || email === "" || password === "") {
        next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcrpytjs.hashSync(password, 10);
    // const newUser = new User({ username, email, password: hashedPassword });
    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword, 
        credits: 50, // Assign initial credits
        signInBonus: true, // Mark the sign-in bonus as claimed
    });

    try {
        await newUser.save();
        res.json( "Signup success! Please signin." );   
    } catch (error)
    {
        next(error);
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === "" || password === "") {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            return next(errorHandler(400, 'User Not Found'));
        }

        const validPassword = bcrpytjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        if(!validUser.signInBonus) {
            validUser.credits += 50;
            validUser.signInBonus = true;
            await validUser.save();
        }

        const token = jwt.sign({ id: validUser._id ,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        next(error);
    }

};


//this is google signin from google Auth
export const google = async (req, res, next) => {
    
    //so if that user exists we will signin that user otherwise will save the data of that user 
    const { email, name, googlePhotoUrl } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (user) {
            if(!user.signInBonus) {
                user.credits += 50;
                user.signInBonus = true;
                await user.save();
            }
            const token = jwt.sign({ id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else {//since to create a new user we need password and from google we are not getting password so we will generate a random password
            const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcrpytjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
                credits: 50,
                signInBonus: true,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id ,isAdmin:newUser.isAdmin}, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
    }
    catch (error) {
        next(error);
    }

}
