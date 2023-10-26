import Axios from "./Axios";
import config from './config'
const http = new Axios({
    baseURL: config,
    timeout: 100000,
    method: "GET",
    headers: {}
})

export default http