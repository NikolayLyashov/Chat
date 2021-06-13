import axios from 'axios';

const userAuthorization = (username, password) => (axios.post('/api/v1/login', { username, password }));

export default userAuthorization;
