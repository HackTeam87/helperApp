import axios from 'axios'


// function GetToken() {
//     const config = {
//         method: 'get',
//         url: 'http://service.golden.net.ua/users/get_token',
//         headers: {
//             accept: "application/json"
//         }
//     }
//
//     let token = axios(config)
//     console.log(token.data);
//     console.log(token.status);
//     return token.data
// }

// GetToken()

const instance = axios.create({
    baseURL: 'https://switcher.golden.net.ua',
    headers: {

        accept: "application/json"
    }
})

export default instance