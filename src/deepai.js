import axios from 'axios'
import config from './config'

export const getSentimentAnalysis = async(text) => {
    try {
        const form = new FormData();
        form.append('text', text);
    
        const result = await axios({
            url: 'https://api.deepai.org/api/sentiment-analysis',
            method: 'POST',
            headers: {
                'api-key': config.DEEPAI_API_KEY
            },
            data: form
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
