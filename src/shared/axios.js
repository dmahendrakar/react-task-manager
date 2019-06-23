import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'https://sy72l3aebf.execute-api.us-west-2.amazonaws.com/v1';

export default instance;