import axios from 'axios';
import {getTokenID} from '../utils/auth.js'
const Axios=axios.create({
    baseURL: '/api',
    timeout: 3000,
});
//5173
Axios.interceptors.request.use(function(config){
    //比如是否需要设置 token
    config.headers['Authorization']=getTokenID();
    console.log('config');
    return config
},error => {console.log('request error')});
export default Axios;