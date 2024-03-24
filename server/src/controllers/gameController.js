import GameHistory from "../models/GameHistory.js";

const updateGameHistory = async (req,res)=>{
    try{
        const {username} = req.params;
        const { guessCount } = req.body;

        await GameHistory.findOneAndUpdate(
            {username},
            {$push: {totalGuessCount: guessCount}},
            {upsert: true}
        );

        res.status(200).json({messgae : "Game history updated successfully"})
    }catch(error){
        res.status(500).json({messgae: "Error updating game history"})
    }
}

const getGameHistory = async (req,res)=>{
    try{

        const {username} = req.params
        const history = await GameHistory.findOne({username})
        res.status(200).json({'history' : history.totalGuessCount })
    }catch(error){
        res.status(500).json({messgae:"Error retrieving user game history"})
    }

}

export {updateGameHistory, getGameHistory}