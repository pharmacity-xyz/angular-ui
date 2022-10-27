import config from '../../../config';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';


function AdminGuard({ children }) {

    const [{ role }] = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (role !== config.roles.ADMIN) {navigate('/')} 
    }, [role, navigate])
    if (role !== config.roles.ADMIN) return null
    return children
}

export default AdminGuard