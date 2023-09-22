import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the token exists in cookies
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const tokenData = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
                console.log(tokenData)
                setUser(tokenData);
            } catch (error) {
                console.error('Error decoding token:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    return user;
}

export default useUser;
