import axios from 'axios'
import config from './config'

export const getRandomCat = async() => {
    try {
        const { data } = await axios({
            headers: {
                'x-api-key': config.CAT_API
            },
            url: 'https://api.thecatapi.com/v1/images/search'
        })

        return data
    } catch (error) {
        console.log(error);
        return null
    }
}