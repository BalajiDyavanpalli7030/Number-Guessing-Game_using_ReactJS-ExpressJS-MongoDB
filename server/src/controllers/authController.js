import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import GameHistory from '../models/GameHistory.js';
const signup = async (req, res) => {
    try{
        const {username, password, email} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({username, email, password:hashedPassword})
        await GameHistory.create({username})
        const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECERET)
        res.status(201).json({accessToken,username, message: 'User created succesfully'})
    } catch(error){
        if (error.code === 11000 || error.keyPattern.username || error.keyPattern.email){
            res.status(400).json({message : `${error.keyPattern.username? 'Username':'Email'} already exists`})
        }else{
            res.status(500).json({message: 'Error creating user'})
        }
    }
};
const signIn = async (req, res) => {

   try{
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message : 'Invalid email or password'})

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(401).json({message : "Invalid email or password"})
        
        const accessToken = jwt.sign({username:user.username}, process.env.ACCESS_TOKEN_SECERET)
        res.status(200).json({accessToken, username:user.username})
   }catch(error){
        res.status(500).json({message : "Error signing in"})
   }
};

export { signup , signIn};
