import { useNavigate } from 'react-router-dom';

export default function useFetchUserHistory(){
    console.log('getPostData.js called')
    const navigate = useNavigate();

    async function fetchUserHistory (method, name,guessCount){
        try {
            const accessToken = localStorage.getItem('accessToken');
    
            // Fetch user's game history
            if (method === 'GET') {
                const historyResponse = await fetch(`http://127.0.0.1:5000/game/users/${name}/history`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!historyResponse.ok) {
                    // navigate('/')
                    throw new Error('Error fetching user history');
                }
    
                const historyData = await historyResponse.json();
                return historyData;
            } else {
                // Update game history (assuming guessCount is available)
                const updateResponse = await fetch(`http://127.0.0.1:5000/game/users/${name}/history`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ guessCount }) // Pass guessCount in the request body
                });
    
                if (!updateResponse.ok) {
                    navigate('/server-error')
                    throw new Error('Error updating game history');
                }
                
                // You may return some data here if needed
                return null;
            }
        } catch (error) {
            navigate('/server-error')
     
        }
    };

    return [fetchUserHistory]
} 

