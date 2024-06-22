import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectBasedOnRole = ({ isAdmin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') && isAdmin) {
            navigate('/admin-dashboard');
        } else if (localStorage.getItem('token')){
            navigate('/user-dashboard');
        } else {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    return null; // Since this is a redirect component, it doesn't render anything
};

export default RedirectBasedOnRole;