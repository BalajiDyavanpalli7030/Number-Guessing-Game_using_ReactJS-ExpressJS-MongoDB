import User from '../models/user.js'
import bcrypt from 'bcrypt'


const fullUserUpdate = async (req, res) =>{
    const {username} = req.params    
    
    const {username: newUsername, email, password} = req.body

    try{
        let user = await User.findOne({username})

        if(!user) {
            return res.status(404).json({message : "User not found"})
        }

        user.username = newUsername
        user.email = email
        
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        
        await user.save()

        res.status(200).json({message: "User details updated successfully"})
    }catch(error){
        if (error.code ===11000 && error.keyPattern.username || error.keyPattern.email){
            res.status(400).json({message: `${error.keyPattern.username? 'Username':'Email'} alredy exists`})
        }else{
            res.status(500).json({message: "Error updating user details"})
        }
    }
}

const partialUserUpdate = async (req,res)=>{
    const {username} = req.params
    const {username:newUsername, email: newEmail, password: newPassword} = req.body

    try{
        let user = await User.findOne({username})

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        if(newUsername){
            user.username = newUsername
        }

        if(newEmail){
            user.email = newEmail
        }

        if(newPassword){
            const hashedPassword = await bcrypt.hash(newPassword,10)
            user.password = hashedPassword
        }

        await user.save()

        res.status(200).json({message: "User details updated successfully"})
    }catch(error){
        if (error.code ===11000 && error.keyPattern?.username || error.keyPattern?.email){
            res.status(400).json({message: `${error.keyPattern.username? 'Username':'Email'} alredy exists`})
        }else{
            res.status(500).json({message: "Error updating user details"})
        }
    }

}

const deleteUser = async (req,res)=>{
    const { username } = req.params
    try{
        const deleteUser = await User.deleteOne({username})

        if (deleteUser.deletedCount === 0){
            return res.status(404).json({message:"User not found"})
        }

        res.status(200).json({message: "User deleted successfully"})

    } catch(error){
        res.status(500).json({message : "Error deleting user"})
    }
}

export { fullUserUpdate, partialUserUpdate, deleteUser }