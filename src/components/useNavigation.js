import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login', { replace: true });
    };

    return { goToLogin };
};

export default useNavigation;