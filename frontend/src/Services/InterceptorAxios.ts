import axios from 'axios';
import store from '../Redux/store';


const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {
    const token = store.getState().authState.user.token;
    request.headers = request.headers || {};
    (request.headers as any).Authorization = token;
    return request;
});

export default tokenAxios;
