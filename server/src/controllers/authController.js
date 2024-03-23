import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const signup = async (req, res) => {
    try{
        const {username, password, email} = req.body
        console.log(username, password, email)
        const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECERET)
        res.status(201).json({accessToken,username, message: 'User created succesfully'})
    } catch(error){
        console.log('Eror creating user',error)
        res.send('Erroer')
    }
};
const signIn = async (req, res) => {
    res.send('<h1>Sign Up</h1>');
};

export { signup , signIn};
