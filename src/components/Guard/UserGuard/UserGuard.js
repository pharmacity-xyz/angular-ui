import config from '../../../config';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';


function UserGuard({ children }) {

    const [{ role }] = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (role !== config.roles.USER && role !== null ) { navigate('/admin'); }
    }, [role, navigate])

    if (role !== config.roles.USER && role !== null) return null;
    return children
}

export default UserGuard