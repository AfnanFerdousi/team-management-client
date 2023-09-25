import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
export const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();

        useEffect(() => {
            // Check if the user is authenticated (you should implement this logic)
            const token = Cookies.get('accessToken'); /* Implement your authentication check here */;

            // If the user is not authenticated, redirect to the login page
            if (!token) {
                router.push('/login');
            }
        }, []); // Add an empty dependency array

        return <WrappedComponent {...props} />;
    };
};
