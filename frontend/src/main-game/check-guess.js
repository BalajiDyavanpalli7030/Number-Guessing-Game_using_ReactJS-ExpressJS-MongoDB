import {useState} from 'react'
import usefetchUserHistory from "./getPostData";

export default function useCheckguess (){
        console.log("check guess.js called")
        const [winningNum,setWinningNum] = useState(Math.floor(Math.random()*100)+1)
        const [guessedCount, setGuessedCount] = useState(1)
        const [fetchUserHistory] = usefetchUserHistory()
        let message;

        function checkguess(guessingNum,name){
            if (!guessingNum){
                return { message: 'Please Enter A Number', winning: false };
            }else if (winningNum===+guessingNum) {
                setWinningNum(Math.floor(Math.random()*100)+1)
                const winningCount = guessedCount
                fetchUserHistory('POST',name,winningCount)
                setGuessedCount(1)
                return { message: `Wow ${name?.toUpperCase()} You Won. Number of Guesses is ${winningCount}`, winning: true };
            }else {
                setGuessedCount(count => count+1)
                if (+guessingNum<winningNum){
                    if (winningNum-(+guessingNum)<=5){
                        message = `Number ${+guessingNum} is low`
                    }else{
                        message = `Number ${+guessingNum} is too low`
                    }
                }else{
                    if ((+guessingNum)-winningNum<=5){
                        message = `Number ${+guessingNum} is high`
                    }else{
                        message = `Number ${+guessingNum} is too high`
                    }
                }
                return { message, winning: false };
            }
        }
    return [checkguess]
}