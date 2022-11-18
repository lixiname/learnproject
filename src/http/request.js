import axios from 'axios';
const Axios=axios.create({
    baseURL: 'http://127.0.0.1:5173',
    timeout: 3000,
});
export default Axios;