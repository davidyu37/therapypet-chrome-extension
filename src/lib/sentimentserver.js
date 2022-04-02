import axios from 'axios'

export const getSentimentAnalysis = async(text) => {
    try {
    
        const result = await axios({
            url: 'https://sentiment-server-api.herokuapp.com/sentiment',
            method: 'POST',
            data: {
                text
            }
        })
        
        if(result.data && result.status === 200) {
            return result.data;
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}
