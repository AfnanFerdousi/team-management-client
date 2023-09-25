import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function useUser() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true)

    useEffect(() => {
        setUserLoading(true)
        // Check if the token exists in cookies
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const tokenData = JSON.parse(atob(token.split('.')[1])); 
                setUser(tokenData);
                setUserLoading(false)
            } catch (error) {
                console.error('Error decoding token:', error);
                setUser(null);
                setUserLoading(false)
            }
        }
    }, []);

    return {user, userLoading};
}

export default useUser;
