import { useContext } from 'react';
import AuthorizationContext from './context/AuthorizationContext.js';

const useAuthorizationData = () => useContext(AuthorizationContext);

export default useAuthorizationData;
