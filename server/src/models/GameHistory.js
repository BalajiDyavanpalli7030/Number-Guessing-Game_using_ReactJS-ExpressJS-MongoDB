import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    totalGuessCount: {
        type: [Number],
        default: []
    }
})

export default mongoose.model('GameHistory',gameSchema)