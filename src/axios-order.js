import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burguer-builder-10146.firebaseio.com/'
});

export default instance;